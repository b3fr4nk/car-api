/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Car = require('../models/car');

/** Route to get one user by username. */
router.get('/users/:username', (req, res) => {
  User.findOne({username: req.params.username})
      .then((user) => {
        return res.json(user);
      });
});

router.get('/users/:userId/garage', (req, res) => {
  User.findById(req.params.userId)
      .then((user) => {
        return res.json(user.cars);
      });
});

/** Route to update an existing user. */
router.put('/users/cars', (req, res) => {
  if (req.user) {
    const cars = req.body.cars;
    cars.forEach((car) => {
      Car.findById(car)
          .then((carObj) => {
            User.findById(req.user._id)
                .then((user) => {
                  user.cars.unshift(carObj._id);
                  return Promise.all([
                    user.save(),
                  ]);
                });
          }).catch((err) => {
            throw err;
          });
    });

    return res.json({message: 'car added to user garage'});
    // User.findByIdAndUpdate(req.params.userId, req.body).then((user) => {
    //   return res.json({user});
    // }).catch((err) => {
    //   throw err;
    // });
  }
});

/** Route to delete a user. */
router.delete('/user/:userId', (req, res) => {
  if (req.user) {
    Car.findByIdAndDelete(req.params.userId).then(() => {
      console.log(req.params.userId);
      return res.json({
        'message': 'Successfully deleted.',
        '_id': req.params.userId,
      });
    })
        .catch((err) => {
          throw err.message;
        });
  }
});

module.exports = router;
