import { AppError } from '../errors/customError.js';
import  AuthService from '../services/auth.service.js';
import type {NextFunction, Request, Response} from 'express';



const register = async(req:Request,res:Response, next:NextFunction):Promise<void> =>{

    //This validation remember me that the proper format is application/json
//     console.log('Content-Type:', req.headers['content-type']);
// console.log('Body:', req.body);

    try{
        // console.log(req.body)
        const user = await AuthService.register(req.body);
        res.status(201).json({message:"User creatded sucessfuly", user})

    }catch(error){
        console.log(error)
        next(error); 
        }
    }



const login = async(req:Request, res:Response) =>{
    try{
        const user = await AuthService.login(req.body);
            return res.status(200).json({
      success: true,
      message: "User logged successfully",
      user
    });
    }catch(error){
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
}

    }
}

let authController = {
    register,
    login,
};

export default authController;