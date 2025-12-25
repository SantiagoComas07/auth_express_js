import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.routes.js';
import type {Request, Response} from 'express';
import sequelize from './config/database.config.js';
import { errorHandle } from './middlewares/error.middlewares.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req:Request,res:Response)=>{
    res.send("Hello world");
})

// This is my auth routes
app.use('/auth', authRoute);

//Middlewares
app.use(errorHandle);

const port = process.env.PORT || 1000;

(async ()=>{
    try{
        await sequelize.sync({alter:true});
        console.log("Database connected");
    app.listen(port, ()=> console.log(`Server runing in http://localhost:${port}`))

    }catch(error){
        console.log("unable to sync database: ", error);
    }
})();
