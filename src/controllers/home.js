import connection from "../database/database.js";

async function getEntries(req, res) {
  console.log("aqui")
  // invalid data 400
  // user already exists 409
  // successful 201
  const authorization = req.headers["authorization"];
  const token = authorization?.replace("Bearer ", "");

  console.log(authorization);
  if (!token) return res.sendStatus(401);
  // confirm status

  try {
    console.log("a1");
    const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
    console.log("a2");
    if (result.rowCount === 0) {
      return res.status(401).send();
      console.log("a3");
      // which status do I use here?
      // 404, 401, 403?
    }
    console.log("a4");

    const userId = result.rows[0].userId;
    console.log(userId);
    const userEntries = await connection.query(
      'SELECT * FROM entries WHERE "userId" = $1 ORDER BY date DESC, id DESC',
      [userId]
    );
    // check if table is working as it should
    // use join here
    console.log("a6", userEntries);

    console.log(typeof userEntries.rows[0].value);

    res.send(userEntries.rows);

  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  getEntries
}