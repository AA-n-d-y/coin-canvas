/// JS file for testing the server



/// Setup

require('dotenv').config(); // Load environment variables from .env
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);

// Need to update these periodicially if they change (for testing purposes)
let accessToken = process.env.TEST_USER_ACCESS_TOKEN;
const userId = process.env.TEST_USER_ID;
const username = process.env.TEST_USER_USERNAME
const password = process.env.TEST_USER_PASSWORD;



/// Tests

// Testing endpoints involving User
describe("User Authentication", function() {
    this.timeout(10000);

    // Testing getting a user
    it ("should get the user | GET request for /getUser", function(done) {
        chai.request(server)
            .get("/getUser")
            .set("authorization", `Bearer ${accessToken}`)
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

    // Testing an unsuccessful account registration
    it("should fail to create an account due to the username already existing | POST request for /register", function(done) {
        chai.request(server)
            .post("/register")
            .send({"firstName": "John", "lastName": "Smith", "email": "random@gmail.com", "username": username, "password": "0"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(409);
                response.should.be.json;
                response.body.createdUser.should.equal(false);
                done();
        });
    });

    // Testing an unsuccessful account registration with error
    it("should fail to create an account due to having no fields | POST request for /register", function(done) {
        chai.request(server)
            .post("/register")
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(422);
                response.should.be.json;
                response.body.createdUser.should.equal(false);
                done();
        });
    });

    // Testing a successful login
    it("should log the user in | POST request for /login", function(done) {
        chai.request(server)
            .post("/login")
            .send({"username": username, "password": password})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(200);
                response.should.be.json;
                response.body.loggedIn.should.equal(true);
                done();
        });
    });

    // Testing an unsuccessful login
    it("should not log the user in because the account does not exist | POST request for /login", function(done) {
        chai.request(server)
            .post("/login")
            .send({"username": "Bob", "password": "0"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(404);
                response.should.be.json;
                response.body.loggedIn.should.equal(false);
                done();
        });
    });

});


// Testing endpoints involving updating User details/preferences
describe("Updating User Details/Preferences", function() {
    this.timeout(5000);

    // Testing updating a user's account details
    it("should successfully update the user's details | PATCH request for /updateUserDetails", function(done) {
        chai.request(server)
            .patch("/updateUserDetails")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"firstName": "1", "lastName": "1", "email": "random@gmail.com", "password": "1"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(200);
                response.should.be.json;
                response.body.updatedDetails.should.equal(true);
                done();
        });
    });

    // Testing failing to update a user's account details due to errors
    it("should not update the user's details | PATCH request for /updateUserDetails", function(done) {
        chai.request(server)
            .patch("/updateUserDetails")
            .set("authorization", `Bearer ${accessToken}`)
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(422);
                response.should.be.json;
                response.body.updatedDetails.should.equal(false);
                done();
        });
    });

    // Testing updating a user's preferences
    it("should successfully update the user's preferences | PUT request for /updateUserPreferences", function(done) {
        chai.request(server)
            .put("/updateUserPreferences")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"currency": "$"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(200);
                response.should.be.json;
                response.body.updatedPreferences.should.equal(true);
                done();
        });
    });

});
