import { Router } from 'express'
import UserController from '../controllers/UserController.js';


const router = Router();


router.route('/').get(UserController.user).post(UserController.create);
router.route("/:userId").patch(UserController.update).delete(UserController.delete);

export default router;