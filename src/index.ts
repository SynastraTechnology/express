import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
