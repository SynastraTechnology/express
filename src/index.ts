import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

app.get('/', (_req, res) => {
  res.json({ message: 'Hello TypeScript Express 🚀' });
});

app.listen(PORT, () => {
  console.log(`Hello TypeScript Express 🚀`);
  console.log(`Server running on http://localhost:${PORT}`);
});
