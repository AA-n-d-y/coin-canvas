/// JS file for testing the Transaction controller



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

// Testing endpoints involving Transaction
describe("Transactions", function() {
    this.timeout(10000);

    // Testing successfully creating a transaction
    it("should successfully create a transaction | POST request for /addTransaction", function(done) {
        chai.request(server)
            .post("/addTransaction")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"date": "2024-08-17", "activity": "test transaction", "amount": "1000", "type": "INCOME", "description": "description test"})
            .end(function(error, response) {
                // If there is an error
                if (error) {
                    done(error);
                }

                // Else
                response.should.have.status(201);
                response.should.be.json;
                response.body.createdTransaction.should.equal(true);
                done();
        });
    });

    // Testing successfully getting all the transactions
    it("should successfully get all the transactions | POST request for /getTransactions", function(done) {
        chai.request(server)
            .post("/getTransactions")
            .set("authorization", `Bearer ${accessToken}`)
            .send({"transactionFilter": ""})
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
