import { body } from 'express-validator'
import User from '../models/User.js';


const validateSignup = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .custom(async val => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
    body('password').notEmpty().withMessage('Password is required'),
  ];
  
  export default validateSignup;
  
  