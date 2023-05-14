/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const Populate = require('../utils/autopopulate');

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  admin: {type: Boolean, required: true},
  cars: [{type: Schema.Types.ObjectId, ref: 'Car'}],
}, {timestamps: true});

// Always populate the cars field
userSchema
    .pre('findOne', Populate('cars'))
    .pre('find', Populate('cars'));

// Must use function expressions here! ES6 => functions do not bind this!
userSchema.pre('save', function(next) {
  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (_, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = model('User', userSchema);
