
import type { IloginDto } from "../DTO/login.dto.js";
import type { IregisterDto } from "../DTO/register.dto.js";
import User from "../models/users.models.js";
import bcryptService from './encrypt.service.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()



// Here I have a class to my auth process
class AuthService {
    // Here I put in a object in the parameters because I receive the information from req - const {email, password} = req.body 
   // {username:string, email:string, password:string} This is an example of the parameter that I need
    public async register(data:IregisterDto ){
        // Here I am destructuring the data
        const {username, email, password} = data;
        // Here I use validations to find out information exist
        if(!username || !email || !password){
            throw new Error("Username, Email and password are required");
        }

        // Here I verify that the password have the proper number of caracters
        if(password.length <8 ){
            throw new Error("There isn't a valid password, the password need 8 characters for safety")
        }
        // This return a True or False status -- This is a query to DB
        const existEmail = await User.findOne({where:{email}});
        // I validate that the email exits 
        if(existEmail){
            throw new Error("The email already exists");
        }

        // Now I hashing the password
        // const salt = await bcrypt.genSalt(10);
        // const passwordHash = await bcrypt.hash(password, salt);
        const passwordHash = await bcryptService.hashPassword(password);


        // Now I create the user--- I need to fix the information that I send
        const user = await User.create({
            username,
            email,
            password:passwordHash,
            role: "user"
        });
        return user;

    }

     public async login(data: IloginDto){
        const { email, password} = data;
        // Here I use validations to find out information exist
        if( !email || !password){
            throw new Error("Username, Email and password are required");
        }
        // I find out the user in my DB
        const user = await User.findOne({where:{email}})
        // Here I verify if the user exist
        if(!user){
            throw new Error("The user isn't exist")
        }
        // here I compare the password to login
        const isPasswordValid = await bcryptService.comparePassword(password, user.password);
        //Validate the valid password 
        if(!isPasswordValid){
            throw new Error("The password is incorrect");
        }
       //Here I use JWT to login for safety
       const token = jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn:"1h"
        }
       )
       return {
        token,
        user:{
            id:user.id,
            username: user.username,
            email:user.email,
        }
       }
     }
}


const authService = new AuthService()

export default authService;