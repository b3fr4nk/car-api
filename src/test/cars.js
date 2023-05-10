const chai = require('chai');
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');
chai.use(chaiHttp);
const app = require('../server');
const agent = chai.request.agent(app);

const Car = require('../models/car');


describe('Cars', () => {
  // Post that we'll use for testing purposes
  // eslint-disable-next-line no-unused-vars
  const newCar = {
    make: 'Mazda',
    model: 'Mazda3',
    model_year: 2016,
    number_of_doors: 4,
    horsepower: 155,
  };

  it('should create new car with valid attributes', (done) => {
    Car.estimatedDocumentCount()
        .then((initialDocCount) => {
          agent.post('/')
              .send((newCar))
              .then((res) => {
                Car.estimatedDocumentCount()
                    .then((newDocCount) => {
                      res.should.have.response(200);
                      newDocCount.should.equal(initialDocCount + 1);
                      chai.expect(res.body.make).to.equal('Mazda');
                      done();
                    })
                    .catch((err) => {
                      done(err);
                    });
              })
              .catch((err) => {
                done(err);
              });
        });
    done();
  });

  it('should update a car', (done) => {
    Car.findOne({make: 'Mazda3'})
        .then((carId) => {
          agent.put(`/${carId}`)
              .send({horsepower: 160})
              .then((res) => {
                chai.should(res.body.horsepower).be.equal(160);
                done();
              });
          done();
        });
    done();
  });

  it('should get car with specified Id', (done) => {
    Car.findOne({model: 'Mazda3'})
        .then((car) => {
          agent.get(`/${car._id}`)
              .end((err, res) => {
                res.should.have.response(200);
                chai.should(res.body.make).to.be.equal('Mazda');
                done();
              });
          done();
        });
    done();
  });

  it('should delete a car', (done) => {
    Car.estimatedDocumentCount()
        .then((initialDocCount) => {
          const carId = Car.findOne({model: 'Mazda3'})._id;
          agent.delete(`/${carId}`);
          Car.estimatedDocumentCount()
              .then((newDocCount) => {
                res.should.have.response(200);
                newDocCount.should.equal(initialDocCount - 1);
              });
        });
    done();
  });
});
