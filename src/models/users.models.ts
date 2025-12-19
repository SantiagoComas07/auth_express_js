import sequelize from '../config/database.config.js';
import { DataTypes, Optional, Model } from 'sequelize';
import bcrypt from 'bcryptjs'
import { timeStamp } from 'node:console';

//This is my interface fo my users -- Could exist an user with createdAt and updatedAt in optional status
// but, never an user with id optional
interface IuserAtributes {
    id:number,
    username:string,
    email:string,
    password:string,
    role: 'admin' | 'user',
    createdAt?:Date,
    updatedAt?:Date 
}

// This is my new interface to become optional some properties of my previos interfaz 'IuserAtributes'
interface IuserCreationAttributes extends Optional<IuserAtributes, 'id'>{}


class User extends Model<IuserAtributes, IuserCreationAttributes> implements IuserAtributes{
    public id!:number;
    public username!:string;
    public email!:string;
    public password!:string;
    public role!: 'admin' | 'user';
    public readonly createAt!: Date;
    public readonly updatedAt!:Date;

    // This is the validation (Simply Method) to make sure that the password is correct
    public async comparePassword(passwordAdded: string):Promise<Boolean>{
        return await bcrypt.compare(passwordAdded, this.password);
    }
}



User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    username:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM('admin', 'user'),
        allowNull:false,
        defaultValue: 'user'

    }
},
{
sequelize,
tableName: 'users',
timestamps:true,
hooks:{
    //  Hook to encrypt the password before to create the user -- I have this function in my service
    // beforeCreate: async (user: User) =>{
    //     // Here I statement the code to encrypt (in simple words)
    //     const salt = await bcrypt.genSalt(10);
    //     user.password = await bcrypt.hash(user.password,salt);
    // },
    beforeUpdate: async (user:User) =>{
        if(user.changed('password')){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        }
        

    }
}
}
);



export default User;









