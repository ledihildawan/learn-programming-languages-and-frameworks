import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:5000`);
});
