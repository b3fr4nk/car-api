const chai = require('chai');
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');
chai.use(chaiHttp);
const app = require('../server');
const agent = chai.request.agent(app);

const Car = require('../models/car');
const User = require('../models/user');


describe('Users', () => {
  // Post that we'll use for testing purposes
  // eslint-disable-next-line no-unused-vars
  const newCar = {
    make: 'Mazda',
    model: 'Mazda3',
    model_year: 2016,
    number_of_doors: 4,
    horsepower: 155,
  };
  const newUser = {
    username: 'test',
    password: 'password',
  };

  it('should create a valid user', (done) => {
    agent.post('/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          User.findOne({username: 'test'})
              .then((user) => {
                user.should.not.equal('password');
                done();
              });
          done();
        });
    done();
  });

  it('should link a car to a user', (done) => {
    User.findOne({username: 'test'})
        .then((user) => {
          agent.put(`/${user}/add`)
              .send({cars: newCar})
              .end((err, res) => {
                if (err) {
                  done(err);
                }
                chai.expect(res.body.cars).to.contain(newCar);
                done();
              });
        });
    done();
  });

  it('should get all cars linked to user', (done) => {
    User.findOne({username: 'test'})
        .then((user) => {
          agent.get(`/${user}`)
              .end((err, res) => {
                if (err) {
                  done(err);
                }
                chai.expect(res.body.cars).to.be.an(Array);
                chai.expect(res.body.cars).to.contain(newCar);
              });
          done();
        });
    done();
  });

  it('should remove cars linked to a user', (done) => {
    User.findOne({username: 'test'})
        .then((user) => {
          Car.findOne({model: 'Mazda3'})
              .then((car) => {
                agent.delete(`/${user}/${car}`)
                    .end((err, res) => {
                      const cars = User.findOne({username: 'test'}).cars;
                      cars.should.not.contain(car);
                    });
              });
        });
    done();
  });
});
