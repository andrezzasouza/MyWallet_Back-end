import express from 'express';
import cors from 'cors';

import Joi from 'joi';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());


app.post('/login', startSession);

app.post('/sign-up', createNewUser);

app.get('/home', getEntries);

app.post('/income', addIncome);

app.post('/expense', addExpense);


app.listen(4000); // move outta here when testing