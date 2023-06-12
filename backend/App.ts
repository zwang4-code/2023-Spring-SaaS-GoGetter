import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GoalModel } from './model/GoalModel';
import { UserModel } from './model/UserModel';
import { ReminderModel } from './model/ReminderModel';
import GooglePassportObj from './GooglePassport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

// import crypto module from Node.js to create Hash
const crypto = require('crypto');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Goals: GoalModel;
  public Users: UserModel;
  public Reminders: ReminderModel;
  public googlePassportObj: GooglePassportObj;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.addAccessControl();
    this.routes();
    this.Goals = new GoalModel();
    this.Users = new UserModel();
    this.Reminders = new ReminderModel();
    this.googlePassportObj = new GooglePassportObj();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session({ secret: 'gogettersecret', resave: false, saveUninitialized: false }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  // Add Access-Control-Allow Header to HTTP response 
  private addAccessControl(): void {
    this.expressApp.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your client's URL
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
      next();
    });
  }

  private validateAuth(req, res, next): void {
    if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  // Configure API endpoints.
  private routes(): void {

    let router = express.Router();

    //--------------------------------------------Google OAUTH GET--------------------------------------

    router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/' }),
      async (req: any, res: any) => {
        try {
          var userId = await this.Users.getUserIdByOauthId(req.user.id);  // req.user.id is the google profile ID

          // create new user if user (more specifically, google profile ID) does not exist in database
          if (!userId) {
            // check if user has profile picture 
            let userPicture;
            if (req.user.photos && req.user.photos.length > 0) {
              userPicture = req.user.photos[0].value;
            }

            let userEmail;
            if (req.user.emails && req.user.emails.length > 0) {
              userEmail = req.user.emails[0].value;
            }

            // create new user object based on google profile
            const newUser = {
              userId: crypto.randomBytes(16).toString("hex"),  // generate random ID to assign to new user 
              oauthId: req.user.id,  // google profile ID
              name: req.user.displayName,
              email: userEmail,
              goalCreated: 0,
              picture: userPicture,
            }
            await this.Users.createNewUser(newUser);
            userId = newUser.userId;
            console.log("New user created and authenticated");
          }
          // Store the userId in the session
          session.userId = userId;
          console.log("User id succesfully authenticated");
          console.log("Redirecting to Category Page");
          res.redirect('/#/category');
        } catch (error) {
          console.error("Error:", error);
          res.redirect('/');
        }
      });

    //--------------------------------------------GOAL CRUD--------------------------------------

    // NOTE: use https://gogetterapp.azurewebsites.net for testing on Azure

    // Create a goal
    // POST: http://localhost:8080/app/goal
    router.post('/app/goal', this.validateAuth, async (req: any, res: any) => {
      var newGoalInfo = req.body;
      try {
        const userId = await this.Users.getUserIdByOauthId(req.user.id);
        if (userId) {
          // Store the userId in the session
          session.userId = userId;
          newGoalInfo.userId = session.userId;
          if (newGoalInfo.description == null) {
            newGoalInfo.description = newGoalInfo.title;
          }
          newGoalInfo.reminder = false;
          newGoalInfo.goalId = crypto.randomBytes(16).toString("hex");  // generate random ID to assign to new user 
          console.log('Create new goal with goalId:' + newGoalInfo.goalId);
          this.Goals.createNewGoal(res, newGoalInfo);
        } else {
          console.log("User not found for querying all goals");
        }
      } catch (error) {
        console.error("Error retrieving userId for getting all goals", error);
      }
    });


    // Retrieve all goals
    // GET: http://localhost:8080/app/goal
    // GET: http://localhost:8080/app/goal?category=Health
    // GET: http://localhost:8080/app/goal?progress=In Progress
    router.get('/app/goal', this.validateAuth, async (req: any, res: any) => {
      if (req.query.hasOwnProperty('category')) {
        const _category = req.query.category;
        console.log('Category: ' + _category);
        this.Goals.retrieveGoalsbyProperties(res, { category: _category });
      }
      else if (req.query.hasOwnProperty('progress')) {
        const _progress = req.query.progress;
        console.log('Progress: ' + _progress);
        this.Goals.retrieveGoalsbyProperties(res, { progress: _progress });
      }
      else {
        console.log('Query all goals');
        try {
          const userId = await this.Users.getUserIdByOauthId(req.user.id);
          if (userId) {
            session.userId = userId;
            this.Goals.retrieveAllGoals(res, { userId: session.userId });
          } else {
            console.log("User not found for querying all goals");
          }
        } catch (error) {
          console.error("Error retrieving userId for getting all goals", error);
        }
      }

    });

    // Retrieve one goal by goalId
    // GET: http://localhost:8080/app/goal/1
    router.get('/app/goal/:goalId', this.validateAuth, (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId: ' + id);
      this.Goals.retrieveGoalDetails(res, { goalId: id });
    });

    // Update one goal for one user
    // PUT: http://localhost:8080/app/goal/1
    router.put('/app/goal/:goalId', this.validateAuth, (req, res) => {
      const id = req.params.goalId;
      const goalUpdate = req.body;
      const filter = { goalId: id };
      this.Goals.UpdateGoal(res, filter, goalUpdate);
    });

    // Delete one goal for one user
    // DELETE: http://localhost:8080/app/goal/1
    router.delete('/app/goal/:goalId', this.validateAuth, (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId to be deleted: ' + id);
      this.Goals.deleteGoal(res, { goalId: id })
    });

    //--------------------------------------------USER CRUD--------------------------------------

    // Retrieve all users
    // http://localhost:8080/app/users
    router.get('/app/users', this.validateAuth, (req: any, res: any) => {
      console.log('Query all users');
      this.Users.retrieveAllUsers(res);
    });

    // Retrieve one user by userId
    // http://localhost:8080/app/user
    router.get('/app/user', this.validateAuth, (req: any, res: any) => {
      var profile = req.user;
      console.log('Query user with ID ' + profile.id);
      this.Users.retrieveUserDetails(res, { oauthId: profile.id });
    });

    // Update one user by userId
    // http://localhost:8000/app/user/2 (user info in JSON in input payload)
    router.put('/app/user', this.validateAuth, (req: any, res: any) => {
      const profile = req.user;
      const userUpdate = req.body;
      console.log('Update info for user with ID ' + profile.id);
      this.Users.updateUserDetails(res, userUpdate, { oauthId: profile.id })
    });

    // Delete one user
    // http://localhost:8000/app/user/2
    router.delete('/app/user/:userId', this.validateAuth, (req, res) => {
      var id = req.params.userId;
      console.log('Delete user with ID ' + id);
      this.Users.deleteUser(res, { userId: id })
    });

    //--------------------------------------------REMINDER CRUD--------------------------------------
    // Note: Reminder feature has not been fully implemented yet.

    // Create a reminder
    // POST: http://localhost:8080/app/reminder
    router.post('/app/reminder', this.validateAuth, async (req: any, res: any) => {
      var newReminderInfo = req.body;
      newReminderInfo.reminderId = crypto.randomBytes(16).toString("hex");  // generate random ID to assign to new user 
      console.log('Reminder created' + newReminderInfo.reminderId);
      this.Reminders.createNewReminder(res, newReminderInfo);
    });

    // Retrieve all reminder
    // GET: http://localhost:8080/app/reminder
    router.get('/app/reminder', this.validateAuth, (req, res) => {
      console.log('Query all reminder');
      this.Reminders.retrieveAllReminder(res);
    });

    // Retrieve one reminder by reminderId
    // GET: http://localhost:8080/app/reminderId/1
    router.get('/app/reminder/:reminderId', this.validateAuth, (req, res) => {
      var id = req.params.reminderId;
      console.log('ReminderId: ' + id);
      this.Reminders.retrieveReminderDetails(res, { reminderId: id });
    });

    // Delete one reminder
    // DELETE: http://localhost:8080/app/reminder/1
    router.delete('/app/reminder/:reminderId', this.validateAuth, (req, res) => {
      var id = req.params.reminderId;
      console.log('reminderId to be deleted: ' + id);
      this.Reminders.deleteReminder(res, { reminderId: id })
    });

    //--------------------------------------------GOAL MOCHA TEST API--------------------------------------
    //------To bypass authentication logic, duplicate API routes are created for testing purpose----------

    // Test retrieve all goals
    router.get('/test/app/goal', (req: any, res: any) => {
      console.log('Query all goals');
      this.Goals.retrieveAllGoals(res, {});
    });

    // Test retrieve one goal by goalId
    router.get('/test/app/goal/:goalId', (req: any, res: any) => {
      var id = req.params.goalId;
      console.log('GoalId: ' + id);
      this.Goals.retrieveGoalDetails(res, { goalId: id });
    });

    // Test create a goal
    router.post('/test/app/goal', async (req: any, res: any) => {
      var newGoalInfo = req.body;
      newGoalInfo.goalId = crypto.randomBytes(16).toString("hex");  // generate random ID to assign to new user 
      console.log('Create new goal with goalId:' + newGoalInfo.goalId);
      this.Goals.createNewGoal(res, newGoalInfo);
    });

    // Test delete one goal for one user
    router.delete('/test/app/goal/:goalId', (req, res) => {
      var id = req.params.goalId;
      console.log('GoalId to be deleted: ' + id);
      this.Goals.deleteGoal(res, { goalId: id })
    });

    this.expressApp.use('/', router);
    this.expressApp.use('/', express.static(__dirname + '/dist/'));
  }
}

export { App };