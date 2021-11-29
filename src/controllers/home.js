import connection from '../database/database.js';

async function getEntries(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const result = await connection.query(
      `
        SELECT 
          users.balance, 
          entries.description, 
          entries.date, 
          entries.value, 
          entries.type, 
          entries.id 
        FROM 
          sessions 
        JOIN 
          entries ON entries."userId" = sessions."userId" 
        JOIN 
          users ON sessions."userId" = users.id 
        WHERE 
          sessions.token = $1
        ORDER BY 
          date DESC, id DESC
        ;
      `,
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(204).send();
    }

    return res.send(result.rows);
  } catch (error) {
    return res.status(500).send({
      message: 'Não foi possível acessar a base de dados. Tente novamente.'
    });
  }
}

export { getEntries };
