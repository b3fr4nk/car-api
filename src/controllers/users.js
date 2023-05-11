/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const User = require('../models/user');

/** Route to get one user by username. */
router.get('/:username', (req, res) => {
  User.findOne({username: req.params.username})
      .then((user) => {
        return res.json(user);
      });
});

/** Route to update an existing user. */
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body).then((user) => {
    return res.json({user});
  }).catch((err) => {
    throw err;
  });
});

/** Route to delete a user. */
router.delete('/:userId', (req, res) => {
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
});

module.exports = router;
