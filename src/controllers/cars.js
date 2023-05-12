/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const Car = require('../models/car');

/** Route to get all car. */
router.get('/cars', (req, res) => {
  Car.find().then((cars) => {
    return res.json({cars});
  })
      .catch((err) => {
        throw err.message;
      });
});

/** Route to get one car by id. */
router.get('/cars/:carId', (req, res) => {
  Car.findById(req.params.carId).then((car) => {
    return res.json({car});
  });
});

/** Route to add a new car. */
router.post('/cars/', (req, res) => {
  if (req.user.admin) {
    console.log(req.body);
    const car = new Car(req.body);
    car.save().then((carResult) => {
      return res.json({car: carResult});
    }).catch((err) => {
      throw err;
    });
  }
});

/** Route to update an existing car. */
router.put('/cars/:carId', (req, res) => {
  if (req.user.admin) {
    Car.findByIdAndUpdate(req.params.carId, req.body).then((car) => {
      return res.json({car});
    }).catch((err) => {
      throw err;
    });
  }
});

/** Route to delete a car. */
router.delete('/cars/:carId', (req, res) => {
  if (req.user.admin) {
    Car.findByIdAndDelete(req.params.carId).then(() => {
      console.log(req.params.carId);
      return res.json({
        'message': 'Successfully deleted.',
        '_id': req.params.carId,
      });
    })
        .catch((err) => {
          throw err.message;
        });
  }
});

module.exports = router;
