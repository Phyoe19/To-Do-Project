import User from "../models/User.js"
import bcrypt from 'bcrypt'

const UserController = {
    user: async (req, res) => {
        try {
            const userList = await User.find();
            if(userList){
                res.status(200).json({
                    message: "UserList",
                    data: userList
                    
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                error: error.message,
            })
        }
    },

    create: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userExist = await User.findOne({email});
            if(userExist){
                res.status(400).json({
                    message: "Email already exist!",
                    error: error.message
                })
            }
            const salt = await bcrypt.genSalt();
            const hashValue = await bcrypt.hash(password,salt);

            const NewUser = await User.create({
                name,
                email,
                password: hashValue
            });
            if(NewUser){
                res.status(200).json({
                    message: "New User create success",
                    data: NewUser
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    },

    update: async (req, res) =>{
        try {
            const userId = req.params.userId;
            const updatedUser = req.body;
            const userExist = await User.findByIdAndUpdate(userId,updatedUser, { new: true,});
            if(userExist){
                res.status(200).json({
                    message: "User Updated is success",
                    data: userExist,
        
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
        
    },

    delete: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId)   
            if (deletedUser) {      
            res.status(200).json({
                message: "Deleted success",
                data: null,
            })
        }
    } catch (error) {
            res.status(500).json({
                message: "Failed to Deleted User",
                error: error.message,
            })
        }
    }



}

export default UserController;