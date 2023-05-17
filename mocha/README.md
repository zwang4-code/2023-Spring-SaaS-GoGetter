Sample Mocha test

Before you start with testing make sure your database is up and running or else executing the "npx mocha" will not work 
* in the backend run "tsc"
* Then run "node AppServer.js" 

Note:
Very important that your local database contain all the same fields that we defined in the schema for each of the object. If you decide to add a goal to the database, remember that it should contain all of the fields that we defined in the schema or else some of the test will fail. If it does fail, do a delete api call in post-man to remove the data that you manually added that is not part of the sample data file. 

In this repository, you will find the various TDD test cases using mocha:
* Test cases are located in the test directory
* Initialize the pre-requisite modules, including mocha, by running "npm install"
* Run test case using the following command "npx mocha"

Tests Created so far:
* Test "Get Multiple Goals"
* Test "Get Single Goal"
* Test "Get Goals By Category"