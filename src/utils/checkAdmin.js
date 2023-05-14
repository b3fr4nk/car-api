const User = require('../models/user');

module.exports = (userId) => {
  return getAdmin = User.findById(userId).lean()
      .then((user) => {
        // console.log(user.admin);
        return user.admin;
      });
};
