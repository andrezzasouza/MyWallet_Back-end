import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function createNewUser (req, res) {
  // invalid data 400
  // user already exists 409
  // successful 201

  const {
    name,
    email,
    password,
    repeatPassword
  } = req.body;

  // check data with Joi and return 400 if something is wrong

  try {

    const checkUser = await connection.query('SELECT * FROM categories WHERE e-mail = $1', [email]);

    if (checkUser.rowCount !== 0) {
      return res.status(409).send("You already have an account.");
    }

    const hash = bcrypt.hashSync(password, 11);

    await connection.query('INSERT INTO users (name, email, password) VALUES $1, $2, $3', [name, email, hash]);

    res.sendStatus(201);
    
  } catch (error) {
    res.sendStatus(500);
  }
}