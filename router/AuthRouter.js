import { Router } from 'express';
import AuthController from "../controllers/AuthController.js";
import User from '../models/User.js';
import { body } from 'express-validator'
import handleErrorMessage from '../middlewares/handleErrorMessage.js';

const router = Router();



//singup
router.post('/signup',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    //custom validation
    body('email').custom(async value => {
        const user = await User.findOne({email : value});
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    body('password').notEmpty(),
],handleErrorMessage,AuthController.signup);

//singin
router.post('/signin', AuthController.signin);
    

export default router;