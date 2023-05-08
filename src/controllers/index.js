const express = require('express')
const carRoutes = require('./cars')
const userRoutes = require('./users')

const router = express.Router()

router.use(carRoutes)

module.exports = router