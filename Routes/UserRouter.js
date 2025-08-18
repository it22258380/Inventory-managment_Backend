import { AddUser,LoginUser,editUser ,deleteUser} from "../Controllers/UserController.js";
import express from 'express';


const userRouter = express.Router();


//validation using express-validaor
userRouter.post('/register', AddUser);
userRouter.post('/login',LoginUser);
userRouter.put('/update/:id',editUser);
userRouter.delete('/delete/:id',deleteUser);

export default userRouter;