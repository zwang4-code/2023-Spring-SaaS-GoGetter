## GoGetter - A goal setting and tracking application

Deployed on Azure: gogetterapp.azurewebsites.net

Folder content:
* backend - contains all code related to mongoose and API to fetch data from mongodb
* frontend - contains code for angular module, component and services
* mocha - contains mocha test cases to test the API
* bootstrap - contains html code for dummy homepage using bootstrap grid

#### If you want to run Angular App and NodeJS on different servers: 
(Angular App runs on Port 4200 by default while NodeJS runs on Port 8080)
##### Go to frontend folder
- ```npm i``` as needed to ensure local node_module is up-to-date after changes have been made to package.json 
- ```ng serve``` to compile and launch Angular app 
- Go to: http://localhost:4200/ to interact with the app 

##### Go to backend folder
- ```npm i``` as needed
- ```npm run build``` (```tsc```) to compile TypeScript code to JavaScript code (only needed if you have made changes to backend code)
- ```npm start``` (```Node AppServer.js```) to run backend code 


### If you have packaged Angular App with NodeJS and want to run both on Port 8080
##### Go to frontend folder 
- ```ng build``` to rebuild Angular App and create updated bundle

##### Go to backend folder
- ```npm start``` (```Node AppServer.js```) to run backend code 
- Go to: http://localhost:8080 to interact with the app 

<br>

### Run Mocha Test
##### Re-load Database Scripts: go to backend/dbScripts folder
- ```mongosh```
- ```show dbs```
- ```use gogetter```
- ```db.dropDatabase()```
- ```load(‘Sampledata.js')```

##### Run Mocha test: go to Mocha folder
- ```npx mocha```

<br>

Authors:
* Preedhi Garg
* Sharon Leo
* Bao Tran Do 
* Zi Wang
