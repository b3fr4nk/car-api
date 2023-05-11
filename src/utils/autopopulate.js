module.exports = (field) => function(next) {
  // eslint-disable-next-line no-invalid-this
  this.populate(field);
  next();
};
