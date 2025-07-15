// ----------------------------------------------
// TCSS 460: Summer 2024
// Backend REST Service Module
// ----------------------------------------------
// Express is a Node.js web application framework
// that provides a wide range of APIs and methods
// Express API Reference:
// https://expressjs.com/en/resources/middleware/cors.html

// ----------------------------------------------
// retrieve necessary files (express and cors)
const express = require("express");
const cors = require("cors");
const path = require("path");

// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config");
// use this library for parsing HTTP body requests
var bodyParser = require("body-parser");

// ----------------------------------------------
// (A)  Create an express application instance
//      and parses incoming requests with JSON
//      payloads
// ----------------------------------------------
var app = express();

// ----------------------------------------------
// (B)  Use the express cors middleware
//      Cross-origin resource sharing (CORS)
//      is a technique that restricts specified
//      resources within web page to be accessed
//      from other domains on which the origin
//      resource was initiated the HTTP request
//      Also use the bodyParser to parse in
//      format the body of HTTP Requests
// ----------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend files


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "read.html")); // serve read.html as the homepage
});


//The order of route definitions in an Express application matters because Express matches routes in the order they are defined. If a more generic route is defined before a more specific one, the generic route may capture requests that should have matched the specific route. In your case, the route /sets/:exercise_name/pr should be placed before /sets/:exercise_name to ensure the specific route is matched first.

//Here's the corrected code with the correct order of route definitions:
// (7) Find the record with the highest weight for a given exercise
// root URI: http://localhost:2000/sets/:exercise_name/pr
app.get("/sets/:exercise_name/pr", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const sqlQuery = "SELECT * FROM set_details WHERE exercise_name = ? ORDER BY weight DESC LIMIT 1";
  dbConnection.query(sqlQuery, [exercise_name], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    if (result.length === 0) {
      return response.status(404).json({ Error: "No record found for this exercise." });
    }
    return response.status(200).json(result[0]);
  });
});

// (1) Retrieve all records in set_details table
// root URI: http://localhost:2000/sets
app.get("/sets", (request, response) => {
  const sqlQuery = "SELECT * FROM set_details;";
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    result.forEach((record) => {
      record.date = record.date.toISOString().split("T")[0]; // Format the date
    });
    response.setHeader("SQLQuery", sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
  });
});

// (2) Retrieve records by exercise name
// exercise name URI: http://localhost:2000/sets/exercise_name
app.get("/sets/:exercise_name", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const sqlQuery = "SELECT * FROM set_details WHERE exercise_name = '" + exercise_name + "';";
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    result.forEach((record) => {
      record.date = record.date.toISOString().split("T")[0]; // Format the date
    });
    response.setHeader("ExerciseName", exercise_name); // send a custom header attribute
    return response.status(200).json(result);
  });
});


// (3) insert a new record into set_details table
// root URI: http://localhost:2000/sets/:exercise_name
// POST request body: { exercise_name: "Push-ups", date: "2024-07-15", sets: 2, reps: 10, weight: 100 }
app.post("/sets/:exercise_name", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const { date, sets, reps, weight } = request.body;
  const sqlQuery = "INSERT INTO set_details (exercise_name, date, sets, reps, weight) VALUES (?, ?, ?, ?, ?)";
  const values = [exercise_name, date, sets, reps, weight];
  
  dbConnection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error("Error in the SQL statement:", err);
      return response.status(400).json({ Error: "Failed: Record was not added." });
    }
    response.setHeader("SQLQuery", sqlQuery); // send a custom header attribute
    return response.status(201).json({ Success: "Successful: Record was added!." });
  });
});


// (4) update an existing record by exercise name and set_details_id
// root URI: http://localhost:2000/sets/:exercise_name/:set_details_id
app.put("/sets/:exercise_name/:set_details_id", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const set_details_id = request.params.set_details_id;
  const checkQuery = "SELECT * FROM set_details WHERE exercise_name = ? AND set_details_id = ?;";
  const updateQuery = `UPDATE set_details SET exercise_name = ?, date = ?, sets = ?, reps = ?, weight = ? WHERE exercise_name = ? AND set_details_id = ?;`;
  const values = [request.body.exercise_name, request.body.date, request.body.sets, request.body.reps, request.body.weight, exercise_name, set_details_id];

  // Check if the record exists
  dbConnection.query(checkQuery, [exercise_name, set_details_id], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    if (result.length === 0) {
      return response.status(404).json({ Error: "Failed: Record does not exist." });
    }
    // If the record exists, update the record
    dbConnection.query(updateQuery, values, (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: Record was not updated." });
      }
      return response.status(200).json({ Success: "Successful: Record was updated!" });
    });
  });
});

// (5) Delete a record by exercise name and set_details_id
// root URI: http://localhost:2000/sets/exercise_name/set_details_id

app.delete("/sets/:exercise_name/:set_details_id", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const set_details_id = request.params.set_details_id;
  const sqlQuery = "DELETE FROM set_details WHERE exercise_name = ? AND set_details_id = ?";
  dbConnection.query(sqlQuery, [exercise_name, set_details_id], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    if (result.affectedRows === 0) {
      return response.status(404).json({ Error: "Set not found." });
    }
    return response.status(200).json({ Success: "Set details deleted successfully!" });
  });
});




// (6) Find a record by exercise name and set_details_id
// root URI: http://localhost:2000/sets/exercise_name/set_details_id
app.get("/sets/:exercise_name/:set_details_id", (request, response) => {
  const exercise_name = request.params.exercise_name;
  const set_details_id = request.params.set_details_id;
  const sqlQuery = "SELECT * FROM set_details WHERE exercise_name = ? AND set_details_id = ?";
  dbConnection.query(sqlQuery, [exercise_name, set_details_id], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
    }
    if (result.length === 0) {
      return response.status(404).json({ Error: "Set not found." });
    }
    return response.status(200).json(result[0]);
  });
});















// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 2000.
app.listen(2000, () => {
  console.log("Express server is running and listening on port 2000");
});
