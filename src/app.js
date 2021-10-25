import express from 'express';
import cors from 'cors';

import { startSession } from "./controllers/login.js";
import { createNewUser } from "./controllers/signup.js";
import { getEntries } from "./controllers/home.js";
import { addEntry } from "./controllers/entry.js";

const app = express();

app.use(cors());
app.use(express.json());


app.post('/login', startSession);

app.post('/sign-up', createNewUser);

app.get('/home', getEntries);

app.post('/entry', addEntry);


export default app;