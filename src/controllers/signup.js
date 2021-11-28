import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { validateSignUp } from '../validation/signup.js';

async function createNewUser(req, res) {
  const { name, email, password, repeatPassword } = req.body;

  const errors = validateSignUp.validate({
    name,
    email,
    password,
    repeatPassword
  }).error;

  if (errors) {
    return res.status(400).send({ message: errors.details[0].message });
  }

  try {
    const checkUser = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (checkUser.rowCount !== 0) {
      return res
        .status(409)
        .send({ message: 'Você já tem uma conta. Faça o login, por favor.' });
    }

    const hash = bcrypt.hashSync(password, 11);
    await connection.query(
      'INSERT INTO users (name, email, password, balance) VALUES ($1, $2, $3, $4)',
      [name, email, hash, 0]
    );
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({
      message: 'Não foi possível acessar a base de dados. Tente novamente.'
    });
  }
}

export { createNewUser };
