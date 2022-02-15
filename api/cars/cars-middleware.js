const carsModel = require('./cars-model');

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  const result = await carsModel.getById(id);
  if (!result) {
    res.status(404).json({ message: `car with id ${id} is not found` });
  } else {
    req.car = result;
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
