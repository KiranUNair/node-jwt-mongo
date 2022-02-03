import express from "express";
import { signUp, signIn} from '../controllers/auth.js';
import { checkDuplicateUsernameOrEmail, checkRolesExisted} from '../middlewares/verifySignUp.js';
import {userRouter} from './user.js'

const authRouter = express.Router();

authRouter.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

authRouter.post('/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted], signUp);
authRouter.post('/signin', signIn);

export { authRouter, userRouter }