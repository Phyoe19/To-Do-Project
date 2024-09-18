import User from '../models/user.js';

const UserController = {
    signup : (req, res) => {
        let {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(500).json({
                success: false,
                message: "Empty input  fields!"
            })
        }
        
            //check user alderary exit
            User.findOne({email}).then(existingUser => {
                if(existingUser){
                    res.status(500).json({
                        success: false,
                        message: "This user email already exist"
                    })
                }
                
                    //create new user
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });
                    newUser.save().then(result => {
                        res.status(200).json({
                            success: true,
                            message: "Signup user success",
                            data: result,
                        })
                    }).catch(e => {
                        console.log(e);
                        res.status(500).json({
                            success: false,
                            message: "Something went wrong"
                        })
                    })
    
            }).catch(e => {
                console.log(e);
                res.status(404).json({
                    success: false,
                    message: "Opps Error"
                })
            })
    
        },

        signin: (req, res) => {
            let { email, password } = req.body;
        
            if(!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                })
            }
                //check if user exist
                User.findOne({email}).then(user => {
                    if(!user) {
                        return res.status(404).json({
                            success: false,
                            message: "User not found",
                            
                        })
                    }
        
                    if(user.password !== password) {
                        return res.status(401).json({
                            success: false,
                            message: "Invalid password"
                        });
                    }
                    
                     //signin success
                         return res.status(200).json({
                            success: true,
                            message: "Signin successful",
                            data: user
                        })
                    
                }).catch(e => {
                    console.log(e)
                    return res.status(500).json({
                        success: false,
                        message: "An error occurred"
                    })
                })
            }
    
    
    }
export default UserController;