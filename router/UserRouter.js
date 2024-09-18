import { Router } from 'express';
import UserController from "../controllers/UserController.js";


const router = Router();



//singup
router.post('/signup', UserController.signup);

//singin
router.post('/signin', UserController.signin)
    

export default router;