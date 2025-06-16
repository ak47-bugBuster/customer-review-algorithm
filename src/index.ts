/*
 * Author: Akshaya Bhandare
 * Page: Main Page
 * Created At: 07-Jun-2025 
*/
import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
