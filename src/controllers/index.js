/* eslint-disable new-cap */
const express = require('express');
const carRoutes = require('./cars');
const authRoutes = require('./auth');
const userRoutes = require('./users');

const router = express.Router();

router.use(authRoutes);
router.use(carRoutes);
router.use(userRoutes);

module.exports = router;
