import connection from "../database/database.js";

async function getEntries(req, res) {
  // invalid data 400
  // user already exists 409
  // successful 201
  try {
  } catch (error) {
    res.sendStatus(500);
  }
}
