const express = require('express');
const router = express.Router();
const Shelter = require('../models/shelter');

module.exports = router;

/* Getting all shelters http://localhost:3000/shelters/getAllShelters */
router.get('/getAllShelters', async (req, res) => {
    try{
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

/* Getting one shelter by ID http://localhost:3000/shelters/getShelter/:id */
router.get('/getShelter/:id', getShelter, (req, res) => {
    res.send(req.shelter);
})

/* Creating a shelter http://localhost:3000/shelters/createShelter */
router.post('/createShelter', async (req, res) => {
    try {
        const shelters = req.body; // Getting all Data to shelters
        const createdShelters = await Promise.all(shelters.map(async shelterData => { // Iterating over shelters and creating a new shelter
            const shelter = new Shelter(shelterData);
            return await shelter.save(); // Saving shelter to Collection
        }));
        res.status(200).json({ message: 'All Shelters added successfully!'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

/* Deleting a shelter by ID http://localhost:3000/shelters/deleteShelter/:id */
router.delete('/deleteShelter/:id', getShelter, async (req, res) => {
    try {
        if (!req.shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }

        await req.shelter.deleteOne(); 
        res.json({ message: "Deleted Shelter" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/* Updating a shelter by ID - http://localhost:3000/shelters/updateShelter/:id */
router.put('/updateShelter/:id', async (req, res) => {
  try{
    await Shelter.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Location: req.body.Location,
        Capacity: req.body.Capacity
    });

    res.send('Shelter Updated!');
  } catch (err){
    res.status(500).json({ message: err.message});
  }
})

/* Middleware function */
async function getShelter(req, res, next) { 
    try {
        const shelter = await Shelter.findById(req.params.id);

        if (shelter == null) {
            return res.status(404).json({ message: "Couldn't find Shelter" });
        }

        req.shelter = shelter;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

