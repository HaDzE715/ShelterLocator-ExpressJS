const express = require('express');
const router = express.Router();
const sheltersController = require('../controllers/sheltersController');
const shelterMiddleware = require('../middlewares/shelterMiddleware');

/* Define routes and their corresponding controller methods */

router.get('/', sheltersController.getAllShelters);
router.get('/:id', shelterMiddleware.getShelter, sheltersController.getShelterById);
router.post('/', sheltersController.createShelter);
router.put('/:id', shelterMiddleware.getShelter, sheltersController.updateShelter);
router.delete('/:id', shelterMiddleware.getShelter, sheltersController.deleteShelter);

module.exports = router;
