var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);
var azure_url = "https://gogetterapp.azurewebsites.net"

/**
 * This test will get the list of the objects 
 */
//Testing API: {azure_url}/test/app/goal
describe('Test "Get Multiple Goals"', function () {
	var requestResult;
	var response;

	before(function (done) {
		chai.request(azure_url)
			.get("/test/app/goal")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	// Return an array of objects 
	it('Should return an array object with more than 1 object', function () {
		expect(requestResult).to.be.an('array');
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(1);
		expect(response).to.have.headers;
	});

	//response should be a json
	it('Should be a json', function () {
		expect(response).to.be.json;
	});

	// Check if the element in the first array has the known attributes defined in the schema
	it('The first entry in the array has known properties', function () {
		expect(requestResult[0]).to.include.keys('description');
		expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});

	// Check if all the elements in the schema are present 
	it('The elements in the array have the expected attribute names', function () {
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('title');
					expect(body[i]).to.have.property('description');
					expect(body[i]).to.have.property('goalId');
					expect(body[i]).to.have.property('userId');
					expect(body[i]).to.have.property('startDate');
					expect(body[i]).to.have.property('endDate');
					expect(body[i]).to.have.property('category');
					expect(body[i]).to.have.property('reminder');
					expect(body[i]).to.have.property('progress');
				}
				return true;
			});
	});

	it('The elements in the array have the expected attribute types', function () {
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('title').that.is.a.string;
					expect(body[i]).to.have.property('description').that.is.a.string;
					expect(body[i]).to.have.property('goalId').that.is.a.string;
					expect(body[i]).to.have.property('userId').that.is.a.string;
					expect(new Date(body[i].endDate)).to.be.a('Date');
					expect(new Date(body[i].startDate)).to.be.a('Date');
					expect(body[i]).to.have.property('category').that.is.a.string;
					expect(body[i]).to.have.property('reminder').that.is.a('boolean');
					expect(body[i]).to.have.property('progress').that.is.a.string;
					expect(body[i]).to.have.property('userId').that.is.a.string;
				}
				return true;
			});
	});

});

/**
 * This is testing for getting a single object.
 * Testing for the goalID = 3
 */
//Testing API: {azure_url}/test/app/goal/3
describe('Test "Get Single Goal"', function () {
	var requestResult;
	var response;

	before(function (done) {
		chai.request(azure_url)
			.get("/test/app/goal/3")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	// Return an array with the goalId = 1
	it('Should return an array object with 1 object', function () {
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
		expect(requestResult).to.have.property('_id');
	});

	// Return that it is a json
	it('Should be a json', function () {
		expect(response).to.be.json;
	});

	// Check if dates exist 
	it('should have a valid start and end date', () => {
		const endDate = new Date(response.body.endDate);
		const startDate = new Date(response.body.startDate);
		expect(endDate).to.be.a('Date');
		expect(startDate).to.be.a('Date');
	});

	// Check that progress element is not empty 
	it('should have the correct progress', () => {
		const allowedValues = ['Not Started', 'In Progress', 'Completed'];
		expect(response.body.progress).to.be.oneOf(allowedValues);
	});

	// Check that category element is not empty 
	it('should have the correct category', () => {
		const allowedValues = ['School', 'Health', 'Career', 'Relationship', 'Reading', 'Travel'];
		expect(response.body.category).to.be.oneOf(allowedValues);
	});

	// Check that the reminder element is a boolean type 
	it('should have a boolean value for reminder', () => {
		expect(response.body.reminder).to.be.a('boolean');
	});

	// Check that the elements are matching up to the one define in the schema for goal
	it('elements in the array have the expected attribute names', function () {
		expect(response.body).to.have.property('title');
		expect(response.body).to.have.property('description');
		expect(response.body).to.have.property('goalId');
		expect(response.body).to.have.property('userId');
		expect(response.body).to.have.property('startDate');
		expect(response.body).to.have.property('endDate');
		expect(response.body).to.have.property('category');
		expect(response.body).to.have.property('reminder');
		expect(response.body).to.have.property('progress');
	});
});

/**
 * This is testing for create a single object.
 */
//Testing API: {azure_url}/test/app/goal
describe('Test "Create a New Goal"', function () {
	var requestResult;
	var response;
	const title = "Pass Mocha Test";
	const description = "Writing Mocha tests while drinking Mocha";
	const userId = "999";
	const startDate = "2023-05-30T00:00:00.000Z"
	const endDate = "2023-06-01T00:00:00.000Z"
	const category = "School";
	const progress = "In Progress";
	const reminder = false;
	var newGoalObj = {
		title: title,
		description: description,
		userId: userId,
		startDate: startDate,
		endDate: endDate,
		category: category,
		progress: progress,
		reminder: reminder,
	}
	var newGoalID = null;

	before(function (done) {
		chai.request(azure_url)
			.post("/test/app/goal")
			.send(newGoalObj)
			.end(function (err, res) {
				response = res;
				requestResult = res.body;
				newGoalID = requestResult[0].goalId;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done()
			});
	});

	// Return return new goal object as json
	it('Should return response as json and goal object in an array', function () {
		expect(response).to.be.json;
		expect(requestResult).to.be.an('array');
	});
	// Return a new goal object with ID 
	it('Should return a goal object with a new goalId', function () {
		expect(requestResult[0]).to.have.property('goalId');
	});

	// Return status 200 
	it('Should return status 200', function () {
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
	});

	// Return the newly created goal object with the correct info 
	it('should return newly created goal object with the correct info', () => {
		expect(requestResult[0].title).to.equal(title)
		expect(requestResult[0].description).to.equal(description)
		expect(requestResult[0].userId).to.equal(userId)
		expect(requestResult[0].startDate.toString()).to.equal(startDate)
		expect(requestResult[0].endDate.toString()).to.equal(endDate)
		expect(requestResult[0].category).to.equal(category)
		expect(requestResult[0].progress).to.equal(progress)
		expect(requestResult[0].reminder).to.equal(reminder)
	});

	// Perform delete request to delete the newly created goal inside the callback function of the POST request (to return database to initial state)
	after(function (done) {
		chai.request(azure_url)
			.delete("/test/app/goal/" + newGoalID)
			.end(function (err, res) {
				if (err) {
					console.log(err);
				} else {
					console.log("Goal successfully deleted");
				}
				done();
			});
	});
});
