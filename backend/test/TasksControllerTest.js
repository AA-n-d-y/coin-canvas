/// JS file for testing the Task controller



/// Setup

require('dotenv').config(); // Load environment variables from .env
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../User");
const jwt = require("jsonwebtoken");
const should = chai.should();
chai.use(chaiHttp);

// Need to update these periodicially if they change (for testing purposes)
let accessToken = process.env.TEST_USER_ACCESS_TOKEN;



/// Tests

// Testing endpoints involving Task
describe("Tasks", function() {
    this.timeout(10000);

    // Testing successfully creating a task
    it("should successfully create a task | POST request for /addTask", function(done) {
        chai.request(server)
            .post("/addTask")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"title": "test task", "date": "2024-08-17", "description": "description test"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(201);
                response.should.be.json;
                response.body.createdTask.should.equal(true);
                done();
        });
    });

    // Testing successfully getting all the tasks
    it("should successfully get all the tasks | POST request for /getTasks", function(done) {
        chai.request(server)
            .post("/getTasks")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"taskFilter": ""})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(200);
                response.should.be.json;
                done();
        });
    });

});