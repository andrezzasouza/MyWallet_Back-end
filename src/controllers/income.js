import connection from "../database/database.js";
import { validateIncome } from "../validation/income.js";
import dayjs from 'dayjs';

async function addIncome(req, res) {
  // invalid data 400
  // user already exists 409
  // successful 201

  const {
    description,
    type,
    value
  } = req.body;

  const errors = validateIncome.validate({
    description,
    value,
    type
  }).error;

  if(errors) {
    return res.status(400).send();
  }
  
  // errors.details[0].message;

  // do I validate the token?

  const authorization = req.headers['authorization'];
  const token = authorization?.replace('Bearer ', '');
  
  if (!token) return res.sendStatus(401);
  
  try {
    
    const result = await connection.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [token]
    );
    
    if (result.rowCount === 0) {
      
      return res.status(401).send();
      // which status do I use here?
      // 404, 401, 403?
    }
    
    // use join here?
    
    const user = result.rows[0];
    const date = dayjs(Date.now()).format('YYYY-MM-DD');
    
    await connection.query(
      'INSERT INTO entries ("userId", description, date, value, type) VALUES ($1, $2, $3, $4, $5)',
      [user.userId, description, date, value, type]
    );
    
    // think about how to calculate the balance

    res.sendStatus(201);

  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  addIncome
}