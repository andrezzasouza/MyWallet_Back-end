import dayjs from 'dayjs';
import connection from '../database/database.js';
import { validateEntry } from '../validation/entry.js';

async function addEntry(req, res) {
  const { description, type, value } = req.body;

  const errors = validateEntry.validate({
    description,
    value,
    type
  }).error;

  if (errors) {
    return res.status(400).send({ message: errors.details[0].message });
  }

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).send('Acesso negado. Tente novamente.');

  try {
    const result = await connection.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(401).send('Acesso negado. Tente novamente.');
    }

    const user = result.rows[0];
    const date = dayjs(Date.now()).format('YYYY-MM-DD');

    await connection.query(
      'INSERT INTO entries ("userId", description, date, value, type) VALUES ($1, $2, $3, $4, $5)',
      [user.userId, description, date, value, type]
    );

    const updateBalance = `UPDATE users SET balance = balance`;

    if (type === 'income') {
      await connection.query(`${updateBalance} + $2 WHERE id = $1`, [
        user.userId,
        value
      ]);
    }
    const teste = await connection.query('SELECT * FROM users WHERE id =  84');

    if (type === 'expense') {
      await connection.query(`${updateBalance} - $2 WHERE id = $1`, [
        user.userId,
        value
      ]);
    }

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({
      message: 'Não foi possível acessar a base de dados. Tente novamente.'
    });
  }
}

export { addEntry };
