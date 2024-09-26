import User from '../models/User.js';
import createToken from '../helpers/createToken.js';

const AuthController = {

    signup : async (req, res) => {
        try {
            const {name, email, password} = req.body;
        const user = await User.signup(name,email,password);

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
            const user = await User.signin(email,password);

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