import express from 'express';
import { connectDB } from './config/db.js';

const app = express();

app.listen(5000, () => {
  connectDB();
  console.log(`Server started at http://locahost:5000`);
});
