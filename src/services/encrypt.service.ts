import bcrypt from 'bcryptjs';


class BcryptService {
    // Here I say if you have another number to define the variable you could state the value, if not then there is 
    // an value by default.
    public salt:number;
    constructor(salt:number= 10){
        this.salt=salt;
    }
    
    public async hashPassword(passwordAdded:string):Promise<string>{
        if(!passwordAdded){
            throw new Error('Password is required for hashing');
        };
        const passwordHashed= await bcrypt.hash(passwordAdded, this.salt);
        return passwordHashed;
    }
    public async comparePassword(plainPassword:string, passwordHashed:string ):Promise<boolean>{
            if(!plainPassword || !passwordHashed){
            throw new Error('Plain password or password hashed is required for hashing');
        };
        const result = await bcrypt.compare(plainPassword, passwordHashed);
        return result;
    }
}


const bcryptService = new BcryptService()

export default bcryptService;