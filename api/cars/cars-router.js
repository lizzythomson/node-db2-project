const router = require('express').Router();

const carsModel = require('./cars-model');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require('./cars-middleware');

router.get('/', (req, res, next) => {
  carsModel
    .getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => next(err));
});

router.get('/:id', checkCarId, (req, res, next) => {
  const id = req.params.id;
  carsModel
    .getById(id)
    .then((car) => {
      res.json(car);
    })
    .catch((err) => next(err));
});

router.post(
  '/',
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  (req, res, next) => {
    carsModel
      .create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch((err) => next(err));
  }
);

router.use((err, req, res, next) => {
  console.log('Error', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
