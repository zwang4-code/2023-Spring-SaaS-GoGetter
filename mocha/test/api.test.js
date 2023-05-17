var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

/**
 * This test will get the list of the objects 
 */
//Testing API: http://localhost:8080/app/goal
describe('Test "Get Multiple Goals"', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/app/goal")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
	// Return an array of objects 
    it('Should return an array object with more than 1 object', function (){
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
    });
    
	// Check if the element in the first array has the known attributes defined in the schema
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('description');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});

	// Check if all the elements in the schema are present 
	it('The elements in the array have the expected properties', function(){
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
					expect(body[i]).to.have.property('userId').that.is.a('string');
				}
				return true;
			});
	});	
	
});

/**
 * This is testing for getting a single object.
 * Testing for the goalID = 1
 */
//Testing API: http://localhost:8080/app/goal/1
describe('Test "Get Single Goal"', function () {
	var requestResult;
	var response;
			 
	before(function (done) {
		chai.request("http://localhost:8080")
			.get("/app/goal/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});
		
	// Return an array with the goalId = 1
	it('Should return an array object with 1 object', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
	});

	// Check if dates exist 
	it('should have a valid start and end date', () => {
		const endDate = new Date(response.body.endDate);
		const startDate = new Date(response.body.startDate);
		expect(endDate).to.be.a('Date');
		expect(startDate).to.be.a('Date');
	});

	// Check if the category health exist 
	it('should have the category as Health', () => {
		expect(response.body.category).to.equal('Health');
	});

	// Check that progress element is not empty 
	it('should have the correct progress', () => {
		const allowedValues = ['Not Started', 'In Progress', 'Completed'];
  		expect(response.body.progress).to.be.oneOf(allowedValues);
	});

	// Check that the reminder element is a boolean type 
	it('should have a boolean value for reminder', () => {
		expect(response.body.reminder).to.be.a('boolean');
	});

	// Check that the elements are matching up to the one define in the schema for goal
	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.have.property('title');
		expect(response.body).to.have.property('description');
		expect(response.body).to.have.property('goalId');
		expect(response.body).to.have.property('userId');
		expect(response.body).to.have.property('startDate');
		expect(response.body).to.have.property('endDate');
		expect(response.body).to.have.property('category');
		expect(response.body).to.have.property('reminder');
		expect(response.body).to.have.property('progress');
		expect(response.body).to.have.property('userId').that.is.a('string');
	});

	// Check the goalID = '1' content is present in the array
	it('Should contain the sample data for goalID = 1', function(){
		expect(response.body).to.have.property('title').contain('Intermittent Fasting');
		expect(response.body).to.have.property('description').contain('Follow 16:8 fasting rule for 30 days');
		expect(response.body).to.have.property('goalId').contain('1');
		expect(response.body).to.have.property('userId').contain('1');
		expect(response.body).to.have.property('startDate').contain('2023-05-05T00:13:41.690Z');
		expect(response.body).to.have.property('endDate').contain('2023-05-05T00:13:41.690Z');
		expect(response.body).to.have.property('category').contain('Health');
		expect(response.body).to.have.property('reminder').equal(false);
		expect(response.body).to.have.property('progress').contain('Not Started');
	});

});


/**
* This is for testing for getting the goals by Category 
*/
describe('Test "Get Goals By Category"', function () {
			var requestResult;
			var response;
				 
			before(function (done) {
				chai.request("http://localhost:8080")
					.get("/app/goal?category=Health")
					.end(function (err, res) {
						requestResult = res.body;
						response = res;
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						done();
					});
				});
			
			it('Should return an array object with at least 1 object', function (){
				expect(response).to.have.status(200);
				expect(response).to.have.headers;
			});
			
			it('The entry in the array has known properties', function(){
				expect(requestResult[0]).to.include.keys('description');
				expect(requestResult[0]).to.have.property('reminder');
				expect(response.body).to.not.be.a.string;
			});
			it('The elements in the array have the expected properties', function(){
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
							expect(body[i]).to.have.property('userId').that.is.a('string');
						}
						return true;
					});
			});	
			
});