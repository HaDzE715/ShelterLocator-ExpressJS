const test = require('supertest');
const sheltersController = require('../controllers/sheltersController');
const app = require('../server'); 

describe("Shelters Methods: ", () => {

  /* Testing get all shelters */
  describe("Get all shelters route", () => {
    describe("Will return all shelters", () => {
      it("should return a 200", async () => {
        await test(app).get(`/shelters`).expect(200);
      });
    });
  });

  /* Testing get shelter by ID */
  describe("Get shelter route", () => {
    describe("Given the shelter does not exist", () => {
      it("should return a 404", async () => {
        const shelterID = '65c2ba3a0cd5413e12f3dc9f';
        await test(app).get(`/shelters/${shelterID}`).expect(404);
      });
    });
  });

  /* Testing delete shelter by ID */
  describe("Delete shelter route", () => {
    describe("Given shelter deleted successfully", () => {
      const shelterID2 = '65c3db3114f6753c32ec6a09'; /* Should always provide a new ID from the DB so this test can succeed */
      it("Should return a 200", async () => {
        const response = await test(app).del(`/shelters/${shelterID2}`).expect(200);
        expect(response.body.message).toBe("Deleted Shelter");
      });
      it("Should return a 404", async () => {
        const response = await test(app).del(`/shelters/${shelterID2}`).expect(404);
        expect(response.body.message).toBe("Shelter not found");
      });
    });
  });

  /*Testing updating shelter by ID*/
  describe("Updating shelter by ID", () => {
    describe("Given shelter updated successfully", () =>{
      it('should update the shelter with valid input data', async () => {
        const shelterId = '65c4ed735b1bb7a6e5271f59';
        const updatedShelterData = {
            Name: 'New Shelter Name',
            Location: 'New Shelter Location',
            Capacity: 50
        };

        const response = await test(app)
            .put(`/shelters/${shelterId}`)
            .send(updatedShelterData).expect(200);
    });

    it('should return a 400 error with invalid input data', async () => {
        const shelterId = '65c4ed735b1bb7a6e5271f59';
        const invalidData = {
            // Invalid data without any fields to update
        };

        const response = await test(app)
            .put(`/shelters/${shelterId}`)
            .send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No valid fields to update');
    });
  });
});

  /* Testing creating shelter */
  describe("Creating shelter", () => {
    describe("Given shelter is created succesfully", () => {
      it("Should create a new single shelter", async () => {
        const newShelter = {
          Name: "Sherlockies Holmies",
          Location: "HereNear",
          Capacity: 69
        }
        const response = await test(app).post('/shelters').send(newShelter).expect(200);
        expect(response.body.message).toBe('A Shelter have been added!');
      });
      it("Should create array of shelters", async () => {
        const shelters = [
          { Name: 'Shelter 1', Location: 'Location 1', Capacity: 20 },
          { Name: 'Shelter 2', Location: 'Location 2', Capacity: 30 }
        ];
        
        const response = await test(app).post('/shelters').send(shelters).expect(200);
        expect(response.body.message).toBe("All Shelters have been saved successfully!");
      });
    });
  });
});
