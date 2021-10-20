import express from 'express';
import cors from 'cors';
import pg from 'pg';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const connectionData = {
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "mywallet",
};

const connection = new Pool(connectionData);

app.listen(4000);