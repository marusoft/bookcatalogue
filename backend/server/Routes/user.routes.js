import express from 'express';
import userController from '../Controllers/user.controller';

import validateUserInput from '../validations/user.validate'


const {createUser, loginUser} = userController;


const userRoute = express.Router();


userRoute.post('/auth/signup', validateUserInput, createUser);
userRoute.post('/auth/signin', loginUser);


export default userRoute;

