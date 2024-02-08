const Shelter = require('../models/shelter');

/* Returns a shelter by id */
async function getShelter(req, res, next) { 
    try {
        const shelter = await Shelter.findById(req.params.id);
        if (!shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }
        req.shelter = shelter;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getShelter
}
