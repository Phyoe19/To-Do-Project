import { Router } from 'express';
import AuthController from "../controllers/AuthController.js";
import handleErrorMessage from '../middlewares/handleErrorMessage.js';
import validateSignup from '../middlewares/ValidateSignUp.js' 
const router = Router();



//singup
router.post('/signup',validateSignup,handleErrorMessage,AuthController.signup);

//singin
router.post('/signin', AuthController.signin);
    

export default router;