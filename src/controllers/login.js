import connection from "../database/database.js";
import { validateLogIn } from "../validation/login.js";

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function startSession(req, res) {
  const {
    email,
    password
  } = req.body;

  const errors = validateLogIn.validate({
    email,
    password
  }).error;

  if(errors) {
    return res.status(400).send('Invalid data');
  }

  try {
    const result = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .send("You don't have an account yet. Please, sign up.");
    }

    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {

      await connection.query('DELETE FROM sessions WHERE "userId" = $1', [user.id]);

      const token = uuid();

      await connection.query(
        'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
        [user.id, token]
      );

      res.status(200).send({token, name: user.name});

    } else {
      res.status(401).send('Incorrect email and/or password.');
      // email or password are wrong
      // status 400, 401, 403 or 404?
      // seems that it's 401
    }

    // remove else
    // use join here
    
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  startSession
}