const express = require('express');
const router = express.Router();
const Shelter = require('../models/shelter');

module.exports = router;

//Getting all shelters
router.get('/', async (req, res) => {
    try{
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

//Getting one shelter
router.get('/:id', getShelter, (req, res) => {
    res.send(res.shelter);
})

//Creating a shelter
router.post('/', async (req, res) => {

    const shelter = new Shelter({
        Name: req.body.Name,
        Location: req.body.Location,
        Capacity: req.body.Capacity
})

try{
    const newShelter = await shelter.save();
    res.status(201).json(newShelter);
} catch (err){
    res.status(400).json( {message: err.message});
}

})
router.delete('/:id', getShelter, async (req, res) => {
    try{
        if (!req.shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }

        await req.shelter.remove();
        res.json({message: "Deleted Shelter"});

    } catch (err){

        res.status(500).json({message: err.message});
    }
})

async function getShelter(req, res, next) { // Middleware function
    let shelter;
    try{
        shelter = await Shelter.findById(req.params.id);

        if(shelter == null)
            return res.status(404).json({message: "Couldn't find Shelter"});

        req.shelter = shelter;
        next();
    } catch (err){
        return res.status(500).json({message: err.message});
    }

}
