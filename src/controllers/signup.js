import connection from '../database/database.js';
import { validateSignUp } from '../validation/signup.js';

import bcrypt from 'bcrypt';

async function createNewUser (req, res) {
  // invalid data 400
  // user already exists 409
  // successful 201
  // server error 500

  console.log(req.body);

  const {
    name,
    email,
    password,
    repeatPassword
  } = req.body;

  const errors = validateSignUp.validate({
    name,
    email,
    password,
    repeatPassword,
  }).error;

  // simplify theses consts

  if(errors) {
    return res.status(400).send('Invalid data');
  }

  try {
    const checkUser = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

    if (checkUser.rowCount !== 0) {
      return res.status(409).send('You already have an account. Please, log in.');
    }

    const hash = bcrypt.hashSync(password, 11);
    await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash]);
    res.sendStatus(201);
    
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  createNewUser
}
