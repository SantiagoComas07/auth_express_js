import  AuthService from '../services/auth.service.js';
import {Request, Response} from 'express';



async  function register(req:Request,res:Response):Promise<void>{
    try{
        const user = await AuthService.register(req.body);
        res.status(201).json({message:"User creatded sucessfuly", user})

    }catch(error){
        console.log(error);
    }
}


async function login(req:Request, res:Response):Promise<void>{
    try{
        const user = await AuthService.login(req.body);
        res.status(201).json({message:"User logged sucessfuly", user})
    }catch(error){
        console.log(error)
    }
}

let authController = {
    register,
    login,
};

export default authController;