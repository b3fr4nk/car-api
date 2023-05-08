/* eslint-disable new-cap */
const express = require('express');
const carRoutes = require('./cars');

const router = express.Router();

router.use(carRoutes);

module.exports = router;
