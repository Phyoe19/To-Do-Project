import { validationResult } from "express-validator";

const handleErrorMessage = (req,res,next) => {

    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.status(400).json({errors : result.mapped()})
    }else {
        next();
    }
}

export default handleErrorMessage;