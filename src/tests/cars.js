const chai = require('chai');
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');
chai.use(chaiHttp);
const app = require('../server');
const agent = chai.request.agent(app);

const Cars = require('../models/car');
const Car = require('../models/car');


describe('Cars', () => {
  // Post that we'll use for testing purposes
  const newCar = {
    make: 'Mazda',
    model: 'Mazda3',
    model_year: 2016,
    number_of_doors: 4,
    horsepower: 155,
  };
});

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
});
