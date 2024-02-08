const Shelter = require('../models/shelter.js');

/* Getting all shelters from the DB */
exports.getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Getting a shelter by ID */
exports.getShelterById = async (req, res) => {
    try {
        if (!req.shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }
        res.json(req.shelter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* Creating a shelter || Array of shelters */
exports.createShelter = async (req, res) => {
    const shelters = req.body;

    try {
        if (!Array.isArray(shelters)) { 
            const shelter = new Shelter(shelters);
            await shelter.save();
            res.status(200).json({ message: "A Shelter have been added!" });
        } else {
            const createdShelters = await Promise.all(shelters.map(async shelterData => {
                const shelter = new Shelter(shelterData);
                return await shelter.save();
            }));
            res.status(200).json({ message: 'All Shelters have been saved successfully!' });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};


/* Updating shelter using ID, can update single parameters in the object */
exports.updateShelter = async (req, res) => {
    try {
        const updatedFields = {};
        
        /* Checking if the values sent by the client is not null */
        if (req.body.Name != null)
            updatedFields.Name = req.body.Name;

        if (req.body.Location != null)
            updatedFields.Location = req.body.Location;

        if (req.body.Capacity != null)
            updatedFields.Capacity = req.body.Capacity;

        /* Checking if sent values are null (Nothing to change!) */

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        /* Updating relevant parameters based on the previous conditions */

        await Shelter.findByIdAndUpdate(req.params.id, updatedFields);
        res.send('Shelter Updated!');

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/* Deleting a shelter by ID */
exports.deleteShelter = async (req, res) => {
    try {
        if (!req.shelter) {
            return res.status(404).json({ message: "Shelter not found" });
        }

        await req.shelter.deleteOne(); 
        res.json({ message: "Deleted Shelter" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
