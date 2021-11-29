import connection from '../database/database.js';

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Acesso negado. Tente novamente.' });
  }

  const session = await connection.query(
    `
      SELECT * FROM sessions WHERE token = $1;
    `,
    [token]
  );

  if (session.rowCount === 0) {
    return res.status(403).send({ message: 'Acesso negado. Tente novamente.' });
  }

  next();
}

export default checkToken;
