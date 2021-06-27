import express from 'express';
import userController from '../Controllers/user.controller'


const {createUser, loginUser} = userController;


const userRoute = express.Router();


userRoute.post('/auth/signup', createUser);
userRoute.post('/auth/signin', loginUser);


export default userRoute;

