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
    console.log("a2");
    if (result.rowCount === 0) {
      return res.status(401).send();
      console.log("a3");
      // which status do I use here?
      // 404, 401, 403?
    }
    console.log("a4");

    // const userId = result.rows[0].userId;
    // console.log(userId);
    // const userEntries = await connection.query(
    //   'SELECT * FROM entries WHERE "userId" = $1 ORDER BY date DESC, id DESC',
    //   [userId]
    // );

    // check if table is working as it should
    // use join here

    // console.log("a8", typeof userBalance.rows[0].balance);

    // console.log(typeof userEntries.rows[0].value);

    res.send(result.rows);

  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  getEntries
}