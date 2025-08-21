 import express from 'express';

 import {addProducts, getProducts, updateProduct,deleteProduct,getProductById,getAvailability,getLowStock,getCategoryGraph} from '../Controllers/ProductController.js';


 const productRouter = express.Router();

 //crud
    productRouter.post('/add', addProducts);
    productRouter.get('/all', getProducts);
    productRouter.put('/update/:id', updateProduct);
    productRouter.delete('/delete/:id',deleteProduct);
    productRouter.get('/:id',getProductById);

    //features
    productRouter.get('/feat/availability', getAvailability);
    productRouter.get('/feat/low-stock', getLowStock);
    productRouter.get('/feat/category-graph', getCategoryGraph);

    export default productRouter;
