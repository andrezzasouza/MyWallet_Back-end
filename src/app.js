import express from 'express';
import cors from 'cors';

import { startSession } from './controllers/login.js';
import { createNewUser } from './controllers/signup.js';
import { getEntries } from './controllers/home.js';
import { addEntry } from './controllers/entry.js';
import checkToken from './middlewares/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/login', startSession);
app.post('/sign-up', createNewUser);
app.get('/home', checkToken, getEntries);
app.post('/entry', checkToken, addEntry);

export default app;
