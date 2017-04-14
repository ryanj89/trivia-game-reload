// change to test environment
process.env.NODE_ENV = 'test';

// requirements
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

// server/database
const server = require('../../app/app');
const knex = require('../../app/db/connection');

chai.use(chaiHttp);
passportStub.install(server);


describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });
  afterEach(() => { 
    passportStub.logout();
    return knex.migrate.rollback(); 
  });

  describe('POST /register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'ryan123',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });

    it('should throw an error if a user is logged in', (done) => {
      passportStub.login({
        username: 'ryanj89',
        password: 'murphy123'
      })
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'newuser',
        password: 'newuser123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Already logged in');
        done();
      });
    });

    it('should throw an error if the user already exists', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'ryanj89',
        password: 'murphy123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('User already exists');
        done();
      });
    });

    it('should throw an error if the username is < 6 characters', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'one23',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Username must be longer than 6 characters');
        done();
      });
    });

    it('should throw an error if the password is < 6 characters', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'ryan123',
        password: 'one23'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Password must be longer than 6 characters');
        done();
      });
    });


  });

  describe('POST /login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'lbendell',
        password: 'ruby123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      })
    });

    it('should not login an unregistered user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'michael',
        password: 'wronguser123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Incorrect username and/or password');
        done();
      });
    });

    it('should throw an error if a user is logged in', (done) => {
      passportStub.login({
        username: 'lbendell',
        password: 'ruby123'
      })
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'newuser',
        password: 'newuser123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Already logged in');
        done();
      });
    });    

    it('should throw an error if a user has incorrect password', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'ryanj89',
        password: 'wrongpass123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Incorrect username and/or password');
        done();
      });
    });    


  });

  describe('GET /logout', () => {
    it('should logout a user', (done) => {
      passportStub.login({
        username: 'ryanj89',
        password: 'murphy123'
      });
      chai.request(server)
      .get('/auth/logout')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/auth/logout')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });

  describe('GET /user', () => {
    it('should return a success for a logged in user', (done) => {
      passportStub.login({
        username: 'ryanj89',
        password: 'murphy123'
      });
      chai.request(server)
      .get('/user')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });

    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/user')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });

  describe('GET /admin', () => {
    it('should return a success for an admin user', (done) => {
      passportStub.login({
        username: 'ryanj89',
        password: 'murphy123'
      });
      chai.request(server)
      .get('/admin')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });

    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/admin')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });

    it('should throw an error if user is not an admin', (done) => {
      passportStub.login({
        username: 'lbendell',
        password: 'ruby123'
      });
      chai.request(server)
      .get('/admin')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Not authorized');
        done();
      });
    });


  });
});