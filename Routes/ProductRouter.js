 import express from 'express';
 import {addProducts, getProducts, updateProduct,deleteProduct,getProductById} from '../Controllers/ProductController.js';


 const productRouter = express.Router();

    productRouter.post('/add', addProducts);
    productRouter.get('/all', getProducts);
    productRouter.put('/update/:id', updateProduct);
    productRouter.delete('/delete/:id', deleteProduct);
    productRouter.get('/:id', getProductById);


    export default productRouter;
