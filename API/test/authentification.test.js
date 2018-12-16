const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);

// Info of an existing user
const email = "myuser@test.fr";
const password = "test";

/**
 * Test the /POST/login route 
 */
describe("/POST /auth/login", () => {

    it("it should login and return the token", (done) => {

        let credentials = {
            "email": email,
            "password": password
        };

        chai.request(server)
            .post("/auth/login")
            .send(credentials)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("idToken");
                res.body.should.have.property("expiresIn");
                done();

            });

    });

    it("it should not login : email ok but password not", (done) => {

        let credentials = {
            "email": email,
            "password": "blbl"
        };

        chai.request(server)
            .post("/auth/login")
            .send(credentials)
            .end((err, res) => {

                res.should.have.status(401);
                res.error.should.have.property("text").eql("ERRORS.BAD_CREDENTIALS");
                done();

            });

    });

    it("it should not login : email not find", (done) => {

        let credentials = {
            "email": "blbl",
            "password": password
        };

        chai.request(server)
            .post("/auth/login")
            .send(credentials)
            .end((err, res) => {

                res.should.have.status(401);
                res.error.should.have.property("text").eql("ERRORS.BAD_CREDENTIALS");
                done();

            });

    });

    it("it should not login : fields are missing", (done) => {

        let credentials = {
            "email": "blbl"
        };

        chai.request(server)
            .post("/auth/login")
            .send(credentials)
            .end((err, res) => {

                res.should.have.status(412);
                res.error.should.have.property("text").eql("ERRORS.MISSING_FIELDS");
                done();

            });

    });

});