
import type {Request, Response, NextFunction } from 'express';
import {AppError} from '../errors/customError.js';



export const errorHandle = ( error:Error ,req:Request ,res:Response ,next:NextFunction):void =>{

        // Here I return the content of AppError
    if(error instanceof AppError){
         res.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }
     res.status(500).json({
        status:"error",
        message: "Internal server error"
    })

}
