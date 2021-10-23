import express from 'express';
import cors from 'cors';

import { startSession } from "./controllers/login.js";
import { createNewUser } from "./controllers/signup.js";
import { getEntries } from "./controllers/home.js";
import { addIncome } from "./controllers/income.js";

const app = express();

app.use(cors());
app.use(express.json());


app.post('/login', startSession);

app.post('/sign-up', createNewUser);

app.get('/home', getEntries);

app.post('/income', addIncome);

// app.post('/expense', addExpense);

// maybe i can use only one route for creating both expense and income

app.listen(4000); // move outta here when testing