import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './Routes/ProductRouter.js';


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoUrl =  process.env.MONGO_URL;


mongoose.connect(mongoUrl );

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
})


app.use('/api/products',productRouter);


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
