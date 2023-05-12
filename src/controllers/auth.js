/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const jwt = require('jsonwebtoken');


// LOGIN
router.post('/login', (req, res) => {
  const {username, password} = req.body;
  // find the user
  User.findOne({username}, 'username password')
      .then((user) => {
        if (!user) {
          // user not found
          return res.status(401).send({message: 'Wrong username/password'});
        }
        // check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // password does not match
            return res.status(401).send({message: 'Wrong username/password'});
          }
          // eslint-disable-next-line max-len
          const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
            expiresIn: '60 days',
          });
            // Set a cookie and redirect to root
          res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
          // eslint-disable-next-line max-len
          return res.json({user: user.username, message: 'successful login', cookie: token});
        });
      })
      .catch((err) => {
        console.log(err);
      });
});

// SIGN UP FORM
router.post('/signup', (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user.save()
      .then((user) => {
        // eslint-disable-next-line max-len
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
        res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
        return res.json({message: 'successful sign up', user: user.username});
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).send({err});
      });
});

// LOG OUT
router.get('/logout', (req, res) => {
  if (req.user) {
    res.clearCookie('nToken');
    return res.json({message: 'logged out user'});
  } else {
    return res.json({message: 'already logged out'});
  }
});

module.exports = router;
