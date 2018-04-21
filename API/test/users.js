const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();
const usersSrv = require('../services/users.srv.js');
const authSrv = require('../services/authentification.srv.js')

chai.use(chaiHttp);

// Info of an existing user
const id = 1;
const email = "myuser@test.fr";

// Info of an unexisting user
const notId = 2;
const notEmail = "test@test.fr"

//generate a token for routes that need authentification
let token = null;
authSrv.generateJWT(id, (tokenObj) => {
    token = tokenObj.idToken;

}, (err) => {
    console.log(err);
})

/**
 * Test the /PUT/create-user route 
 */
describe('/PUT create-user', () => {

    //delete the user that we created
    after(() => {
        usersSrv.deleteByEmail(notEmail, (rows) => {
            console.log("clean database");
        }, (err) => {
            console.log(err);
        })
    });


    it('it should create a user', (done) => {

        let user = {
            user: {
                email: notEmail,
                firstname: "Jean",
                lastname: "Dupont",
                password: "test"
            }
        }

        chai.request(server)
            .put('/create-user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('insertId');
                done();
            })
    })

    it('it should not create a user because fields are missing', (done) => {

        let user = {
            user: {
                email: "blblb@test.fr",
                firstname: "Jean",
            }
        }

        chai.request(server)
            .put('/create-user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(412);
                res.error.should.have.property('text').eql("ERRORS.MISSING_FIELDS");
                done();
            })
    })

    it('it should not create a user because it already exist', (done) => {

        let user = {
            user: {
                email: email,
                firstname: "Paul",
                lastname: "Pierre",
                password: "test"
            }
        }

        chai.request(server)
            .put('/create-user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(412);
                res.error.should.have.property('text').eql("ERRORS.EMAIL_NOT_UNIQUE");
                done();
            })
    })
})

/**
 * Test the /GET/users/:id route
 */
describe('/GET users/:id', () => {
    it('it should GET a user by the given id', (done) => {
        chai.request(server)
            .get(`/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                res.body.should.have.property('created_at');
                res.body.should.have.property('id').eql(id);
                done();
            });
    });

    it('it should not return a user because the user does not exist', (done) => {
        chai.request(server)
            .get(`/users/${notId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});