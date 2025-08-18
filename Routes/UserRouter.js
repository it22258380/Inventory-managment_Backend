import { AddUser,LoginUser,editUser } from "../Controllers/UserController.js";
import express from 'express';


const userRouter = express.Router();



userRouter.post('/register', AddUser);
userRouter.post('/login',LoginUser);
userRouter.put('/update/:id',editUser);
//userRouter.delete('/delete/:id',deleteUser);

export default userRouter;