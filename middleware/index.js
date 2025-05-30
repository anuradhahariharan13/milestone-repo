import express from 'express';
import config from './configs/env.js'
import defaultRouter  from './routes/routes.js';
import connectDb from './configs/db_setup.js';

const app = express();

app.use(express.json()); 

const port =config.PORT
connectDb();

app.use("/test",defaultRouter);

app.use((req, res) => {
  res.status(404).json({
    error: 'Resource not found'
  });
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});