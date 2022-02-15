const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');

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
  if (!req.body.vin) {
    res.status(400).json({ message: `vin is missing` });
  } else if (!req.body.make) {
    res.status(400).json({ message: `make is missing` });
  } else if (!req.body.model) {
    res.status(400).json({ message: `model is missing` });
  } else if (!req.body.mileage) {
    res.status(400).json({ message: `mileage is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin.trim();
  const allCars = await carsModel.getAll();
  const duplicateVin = allCars.find((car) => {
    return car.vin === vin;
  });
  if (duplicateVin !== undefined) {
    res.status(400).json({ message: `vin ${vin} already exists` });
  } else {
    req.body.vin = req.body.vin.trim();
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
