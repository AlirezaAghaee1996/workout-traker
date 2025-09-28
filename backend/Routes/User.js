import { Router } from "express";
import {  getOne, update } from "../Controllers/UserCn.js";
import IsLogin from "../Middlewares/IsLogin.js";
const userRouter = Router();
userRouter.route('/:id').get(IsLogin, getOne).patch(IsLogin, update)
export default userRouter;
