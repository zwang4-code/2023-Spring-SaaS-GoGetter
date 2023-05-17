This directory contains backend code using MongooseDB

Content:
* Model - Model Classes for Goal and User
* Interface - Interface for GoalModel and User Model
* Enum - Enum Classes for Category, FavoriteView, and Progress
* DbClient.ts - mongo db client
* dbScripts - SampleData script to be uploadded on mongoDb

MONGODB LOCAl SETUP 

	1. /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	2. Enter password
	3. Press enter again
	4. brew tap mongodb/brew
	5. brew update
	6. brew install mongodb-community@6.0
	7. brew services start mongodb-community@6.0
	8. brew services stop mongodb-community@6.0 (this is to stop the mongodb)

Now your mongodb is up and running.

MONGOSH TO ACCESS MONGODB

	1. Copy SampleData.js and AdminScript.js from git and past in any folder
	2. Open new terminal window and go that folder where these scripts reside.
	3.  Type "mongosh" command
	4. Run "load('SampleData.js')
	5. Run "load('AdminScript.js')
	6. You can now query your mongodb
	7. Run "show dbs"
	8. You can see our gogetter db created
	9. Type "use gogetter" to switch to the gogetter database
	10. Type "show collections" to show the collection within the gogetter database
	11. To view a collection like goals and all of its content type "db.goals.find()" -> note .find() is a mongoDB function to get all of the sample data that you loaded. 

CHANGES TO CODE TO ACCESS MONGODB THROUGH CODE

	1. Now go to your backend code
	2. open DataAccess.ts and replace connection string with "mongodb://dbAdmin:test@localhost:27017/gogetter?authSource=admin". 
	3. You can now test your API from postman

RUNNING THE BACKEND SERVER TO ALLOW API TESTING USING POSTMAN(do this in terminal) 
	1. Install the typescript compiler by doing "npm install -g typescript"
	2. Go to the backend folder and type "tsc" to compile
	3. Type "node AppServer.js" to run the server 

MONGODb ONLINE
Download MongoDB Compass and use the following string to access database
Connection String: 'mongodb+srv://Cluster96542:W15dQ3hlY1N2@cluster96542.kaymygv.mongodb.net/gogetter'

To execute the server db and then the node server with the following commands:

To run:
1. Take git clone: git clone -b mainV2 https://github.com/PreeGarg/GoGetter.git
2. Open terminal inside backend directory and run below commands
3. npm install
4. tsc (ignore any warning)
5. Run express/node server: node AppServer.js 

To test, open postman and copy below URLS. Make sure you do db.goals.find() to double check your work
for put, post, and delete
* POST: http://localhost:8080/app/goal (goal info in JSON in input payload)
* GET: http://localhost:8080/app/goal
* GET: http://localhost:8080/app/goal/1
* GET: http://localhost:8080/app/goal?category=Health
* GET: http://localhost:8080/app/goal?progress=In Progress
* PUT: http://localhost:8080/app/goal/1  (goal info in JSON in input payload)
* DELETE: http://localhost:8080/app/goal/1

* POST: http://localhost:8080/app/user (user info in JSON in input payload)
* GET: http://localhost:8080/app/user
* GET: http://localhost:8080/app/user/1
* PUT: http://localhost:8080/app/user/2 (user info in JSON in input payload)
* DELETE: http://localhost:8080/app/user/2

* POST: http://localhost:8080/app/reminder (reminder info in JSON in input payload)
* GET: http://localhost:8080/app/reminder
* GET: http://localhost:8080/app/reminder/1
* DELETE: http://localhost:8080/app/reminder/2