
import mongoose, { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String, 
        required: true
    }
   
});

//refactor custom method in model
UserSchema.statics.signup = async function(name,email,password) {
 
    //In models statics methods call user class use this keyword
    const userExists = await this.findOne({email});
    //check user alderary exit
                if(userExists){
                    throw new Error("This user email already Exists")
                }
                
                    //create new user
                    
                    const salt = await bcrypt.genSalt();
                    const hashValue = await bcrypt.hash(password,salt);

                    const user = await this.create({
                        name,
                        email,
                        password: hashValue
                    });
                    return user;
}

UserSchema.statics.signin = async function(email,password) {
 
    //In models statics methods call user class use this keyword
    const user = await this.findOne({email});
    //check user alderary exit
                if(!user){
                    throw new Error("User does not Exists")
                }
                
                let isCorrect = await bcrypt.compare(password,user.password)
                if(isCorrect){
                    return user;
                }else {
                    throw new Error("Password incorrect")
                }
                    
}


export const User = mongoose.models.User || new model("User", UserSchema);

export default User;