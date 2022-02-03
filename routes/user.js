import express from "express";
import {allAccess, userBoard, adminBoard, moderatorBoard} from '../controllers/user.js';
import {verifyToken, isAdmin, isModerator} from '../middlewares/authJwt.js';

export const userRouter = express.Router();

// userRouter.use((req, res, next) => {
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
//     next();
// });

userRouter.get("/all", allAccess);

userRouter.get("/user", [verifyToken], userBoard);

userRouter.get("/mod",[verifyToken, isModerator], moderatorBoard);

userRouter.get("/admin", [verifyToken, isAdmin], adminBoard);