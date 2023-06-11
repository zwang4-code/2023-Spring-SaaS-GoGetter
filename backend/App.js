"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const GoalModel_1 = require("./model/GoalModel");
const UserModel_1 = require("./model/UserModel");
const ReminderModel_1 = require("./model/ReminderModel");
const GooglePassport_1 = require("./GooglePassport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
// import crypto module from Node.js to create Hash
const crypto = require('crypto');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.addAccessControl();
        this.routes();
        this.Goals = new GoalModel_1.GoalModel();
        this.Users = new UserModel_1.UserModel();
        this.Reminders = new ReminderModel_1.ReminderModel();
        this.googlePassportObj = new GooglePassport_1.default();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: 'gogettersecret', resave: false, saveUninitialized: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    // Add Access-Control-Allow Header to HTTP response 
    addAccessControl() {
        this.expressApp.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your client's URL
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
            next();
        });
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        //GOOGLE OAUTH
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield this.Users.getUserIdByOauthId(req.user.id);
                if (userId) {
                    // Store the userId in the session
                    session.userId = userId;
                    console.log("User id succesfully authenticated");
                    console.log("Redirecting to Category Page");
                    res.redirect('/#/category');
                }
                else {
                    console.log("User not found");
                    res.redirect('/login');
                }
            }
            catch (error) {
                console.error("Error retrieving userId:", error);
                res.redirect('/login');
            }
        }));
        //--------------------------------------------GOAL CRUD--------------------------------------
        // NOTE: use https://gogetterapp.azurewebsites.net for testing on Azure
        // Create a goal
        // POST: http://localhost:8080/app/goal
        router.post('/app/goal', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var newGoalInfo = req.body;
            try {
                const userId = yield this.Users.getUserIdByOauthId(req.user.id);
                if (userId) {
                    // Store the userId in the session
                    session.userId = userId;
                    newGoalInfo.userId = session.userId;
                    if (newGoalInfo.description == null) {
                        newGoalInfo.description = newGoalInfo.title;
                    }
                    newGoalInfo.reminder = false;
                    newGoalInfo.goalId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
                    console.log('Create new goal with goalId:' + newGoalInfo.goalId);
                    this.Goals.createNewGoal(res, newGoalInfo);
                }
                else {
                    console.log("User not found for querying all goals");
                }
            }
            catch (error) {
                console.error("Error retrieving userId for getting all goals", error);
            }
        }));
        // Retrieve all goals
        // GET: http://localhost:8080/app/goal
        // GET: http://localhost:8080/app/goal?category=Health
        // GET: http://localhost:8080/app/goal?progress=In Progress
        router.get('/app/goal', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    const userId = yield this.Users.getUserIdByOauthId(req.user.id);
                    if (userId) {
                        session.userId = userId;
                        this.Goals.retrieveAllGoals(res, { userId: session.userId });
                    }
                    else {
                        console.log("User not found for querying all goals");
                    }
                }
                catch (error) {
                    console.error("Error retrieving userId for getting all goals", error);
                }
            }
        }));
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
            this.Goals.deleteGoal(res, { goalId: id });
        });
        //--------------------------------------------USER CRUD--------------------------------------
        // Create a user
        // http://localhost:8080/app/user (user info as JSON in input payload)
        router.post('/app/user/', this.validateAuth, (req, res) => {
            var newUserInfo = req.body;
            var newUserEmail = newUserInfo.email; // email will be used to check for existing user
            newUserInfo.userId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
            console.log('Add new user to database');
            this.Users.createNewUser(res, newUserInfo, { email: newUserEmail });
        });
        // Retrieve all users
        // http://localhost:8080/app/users
        router.get('/app/users', this.validateAuth, (req, res) => {
            console.log('Query all users');
            this.Users.retrieveAllUsers(res);
        });
        // Retrieve one user by userId
        // http://localhost:8080/app/user
        router.get('/app/user', this.validateAuth, (req, res) => {
            var profile = req.user;
            console.log('Query user with ID ' + profile.id);
            this.Users.retrieveUserDetails(res, { oauthId: profile.id });
        });
        // Update one user by userId
        // http://localhost:8000/app/user/2 (user info in JSON in input payload)
        router.put('/app/user', this.validateAuth, (req, res) => {
            const profile = req.user;
            const userUpdate = req.body;
            console.log('Update info for user with ID ' + profile.id);
            this.Users.updateUserDetails(res, userUpdate, { oauthId: profile.id });
        });
        // Delete one user
        // http://localhost:8000/app/user/2
        router.delete('/app/user/:userId', this.validateAuth, (req, res) => {
            var id = req.params.userId;
            console.log('Delete user with ID ' + id);
            this.Users.deleteUser(res, { userId: id });
        });
        //--------------------------------------------REMINDER CRUD--------------------------------------
        // Note: Reminder feature has not been fully implemented yet.
        // Create a reminder
        // POST: http://localhost:8080/app/reminder
        router.post('/app/reminder', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var newReminderInfo = req.body;
            newReminderInfo.reminderId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
            console.log('Reminder created' + newReminderInfo.reminderId);
            this.Reminders.createNewReminder(res, newReminderInfo);
        }));
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
            this.Reminders.deleteReminder(res, { reminderId: id });
        });
        //--------------------------------------------GOAL MOCHA TEST API--------------------------------------
        //------To bypass authentication logic, duplicate API routes are created for testing purpose----------
        // Test retrieve all goals
        router.get('/test/app/goal', (req, res) => {
            console.log('Query all goals');
            this.Goals.retrieveAllGoals(res, {});
        });
        // Test retrieve one goal by goalId
        router.get('/test/app/goal/:goalId', (req, res) => {
            var id = req.params.goalId;
            console.log('GoalId: ' + id);
            this.Goals.retrieveGoalDetails(res, { goalId: id });
        });
        // Test create a goal
        router.post('/test/app/goal', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var newGoalInfo = req.body;
            newGoalInfo.goalId = crypto.randomBytes(16).toString("hex"); // generate random ID to assign to new user 
            console.log('Create new goal with goalId:' + newGoalInfo.goalId);
            this.Goals.createNewGoal(res, newGoalInfo);
        }));
        // Test delete one goal for one user
        router.delete('/test/app/goal/:goalId', (req, res) => {
            var id = req.params.goalId;
            console.log('GoalId to be deleted: ' + id);
            this.Goals.deleteGoal(res, { goalId: id });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static(__dirname + '/dist/'));
    }
}
exports.App = App;
