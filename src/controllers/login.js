import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { validateLogIn } from '../validation/login.js';

async function startSession(req, res) {
  const { email, password } = req.body;

  const errors = validateLogIn.validate({
    email,
    password
  }).error;

  if (errors) {
    return res.status(400).send({ message: errors.details[0].message });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        message:
          'Você ainda não tem uma conta. Clique abaixo para se cadastrar ou entre com outro e-mail.'
      });
    }

    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      await connection.query('DELETE FROM sessions WHERE "userId" = $1', [
        user.id
      ]);

      const token = uuid();

      await connection.query(
        'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
        [user.id, token]
      );

      return res.status(200).send({ token, name: user.name });
    }
    return res
      .status(401)
      .send({ message: 'Combinação e-mail/senha incorreta. Tente novamente.' });
  } catch (error) {
    return res.status(500).send({
      message: 'Não foi possível acessar a base de dados. Tente novamente.'
    });
  }
}

export { startSession };
