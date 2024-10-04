import jwt from 'jsonwebtoken'

const AuthMiddlewares = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedValue) => {
            if(err){
                return res.status(401).json({
                    message: "token is unauthenticated"
                })
            }else {
                next()
            }
        })

    }else {
        return res.status(400).json({
            message: "token need to provide"
        })
    }

    

}

export default AuthMiddlewares;