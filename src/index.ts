import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 1000;

app.listen(port, ()=> console.log(`Server runing in http://localhost${port}`))