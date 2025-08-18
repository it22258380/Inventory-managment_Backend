import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt,{decode} from 'jsonwebtoken';
import cors from 'cors';

import userRouter from './routes/UserRouter.js';



dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

  


app.use((req, res, next) => {
    let token = req.headers['authorization']; 

    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token is invalid' });
            } else {
                req.user = decoded;  
                next();
            }
        });
    } else {
        next();  
    }
});

const mongoUrl =  process.env.MONGO_URL;


mongoose.connect(mongoUrl );

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
})


app.use('/api/users',userRouter);



app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
