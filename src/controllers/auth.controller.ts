import  AuthService from '../services/auth.service.js';
import type {Request, Response} from 'express';



const register = async(req:Request,res:Response):Promise<void> =>{

    //This validation remember me that the proper format is application/json
//     console.log('Content-Type:', req.headers['content-type']);
// console.log('Body:', req.body);

    try{
        // console.log(req.body)
        const user = await AuthService.register(req.body);
        res.status(201).json({message:"User creatded sucessfuly", user})

    }catch(error){
        console.log(error);
    }
}


const login = async(req:Request, res:Response):Promise<void> =>{
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