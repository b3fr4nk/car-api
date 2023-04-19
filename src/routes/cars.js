const express = require('express')
const router = express.Router();

const Car = require('../models/car')

/** Route to get all messages. */
router.get('/', (req, res) => {
    Car.find().then((cars) => {
        return res.json({cars})
    })
    .catch((err) => {
        throw err.message
    })
})

/** Route to get one message by id. */
router.get('/:carId', (req, res) => {
    Car.findById(req.params.carId).then((car) => {
        return res.json({car})
    })
})

/** Route to add a new message. */
router.post('/', (req, res) => {
    console.log(req.body)
    const car = new Car(req.body)
    car.save().then(carResult => {
        return res.json({car: carResult})
    }).catch((err) => {
        throw err
    })

})

/** Route to update an existing message. */
router.put('/:carId', (req, res) => {
    Car.findByIdAndUpdate(req.params.carId, req.body).then((car) => {
        return res.json({car})
    }).catch((err) => {
        throw err
    })
})

/** Route to delete a message. */
router.delete('/:carId', (req, res) => {
    Car.findByIdAndDelete(req.params.carId).then(() => {
        console.log(req.params.carId)
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.carId
        })
    })
    .catch((err) => {
        throw err.message
    })
})

module.exports = router