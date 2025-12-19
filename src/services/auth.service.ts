import User from "../models/users.models";
import bcryptService from './encrypt.service.js'



// Here I have a class to my auth process
class AuthService {
    // Here I put in a object in the parameters because I receive the information from req - const {email, password} = req.body 
    public async register({email,password}: {email:string, password:string}){
        // Here I use validations to find out information exist
        if(!email || !password){
            throw new Error("Email and password are required");
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
            username: "Andres",
            email,
            password:passwordHash,
            role: "user"
        });
        return user;

    }

    // public async login(credentials){
    //     const  user = await User.findOne({where:{email}})
    // }
}