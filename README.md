# Shelter Locator

[![Postman Documentation](https://img.shields.io/badge/Postman-Documentation-orange)](https://documenter.getpostman.com/view/31556366/2s9YyzcHd8)

Enhance your Node.js server architecture for a shelter locator application by leveraging Express 
to seamlessly handle routing and MongoDB to efficiently manage data storage.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HaDzE715/ShelterLocator-ExpressJS
  
2. install dependencies: 
    ```bash
    npm i express mongoose
    npm i --save-dev dotenv nodemon
    npm i jest supertest
    ```

## Route Description - Server API side

       GET
       /shelters - Get all shelters
       /shelters/:id - Get shelter by ID.

       POST
       /shelters - Create a shelter

       PUT
       /shelters/:id - Update a shelter by ID.

       DELETE
       /shelters/:id - Delete a shelter by ID.

## Testing 
  I conduct comprehensive testing of server's routes using Jest, a popular JavaScript testing framework.
  Each endpoint in our application is thoroughly tested to ensure proper functionality and behavior.
  The test file can be found inside the tests folder where there will be all the tests I made 
  [Test Screenshot](https://imgur.com/aUuujCU).

## Enhancements and Challenges Encountered
During the development process, I encountered challenges related to understanding the role and functionality of controllers in the Express.js framework. However, through thorough reading and experimentation, I gained a clear understanding of how controllers operate and how to effectively integrate them with routers. Additionally, I explored the usage of middleware functions and discovered their utility in handling request processing tasks.

One significant aspect of the project involved implementing comprehensive testing using Jest, a JavaScript testing framework. Despite initial complexities, I invested over two hours to create tests for all endpoints integrated with MongoDB and ExpressJS. Through this process, I gained valuable insights into the ease and efficiency of testing RESTful APIs, further solidifying my understanding of the interaction between MongoDB, ExpressJS, and Jest.

Overall, overcoming these challenges enhanced my proficiency in building server-side applications with Node.js, Express.js, and MongoDB. The experience underscored the importance of hands-on exploration and perseverance in tackling complex software development tasks.
