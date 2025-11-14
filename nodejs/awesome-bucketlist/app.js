import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config/database.js';
import bucketlist from './controllers/bucketlist.js';

// Connect mongoose to our database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// Declaring Port
const port = 3000;

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize our app variable
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for body parsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Invalid page');
});

// Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist', bucketlist);

// Listen to port
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});

export default app;
