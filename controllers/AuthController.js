import User from '../models/User.js';
import bcrypt from 'bcrypt'
import createToken from '../helpers/createToken.js';

const AuthController = {

    signup : async (req, res) => {
        try {
            const {name, email, password} = req.body;
            const userExists = await User.findOne({email});
                //check user already exit
                if(userExists){
                    throw new Error("This user email already Exists")
                    }
            const salt = await bcrypt.genSalt();
            const hashValue = await bcrypt.hash(password,salt);
                    
            //create new user
            const user = await User.create({
                name,
                email,
                password: hashValue
            });               
           //createtoken
            const token = createToken(user._id);
            res.cookie('jwt',token, { httpOnly : true, maxAge : 3 * 24 * 60 * 60 *
             1000});
            return res.json({user,token});
        } catch (error) {
            return res.status(400).json({ error: error.message})
        }
        },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email});
            //check user alderary exit
            if(!user){
                throw new Error("User does not Exists")
            }
            let isCorrect = await bcrypt.compare(password,user.password)
                if(!isCorrect){
                    throw new Error("Password incorrect")
                }

            const token = createToken(user._id);
            res.cookie('jwt',token, { httpOnly : true, maxAge : 3 * 24 * 60 * 60 *
                 1000});
            return res.json({user,token});                          
        }catch(error) {
            return res.status(400).json({ error: error.message})    
        }
    }
}
export default AuthController;