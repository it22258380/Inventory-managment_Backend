import Product from '../Models/Product.js';

/* Add products to the database - only admins */
export function addProducts(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

   
    const productData = req.body;
    const newProduct = new Product(productData);

    newProduct.save()
        .then(() => {
            res.status(200).json("Product added successfully");
        })
        .catch((err) => {
            res.status(500).json("Cannot add product: " + err);
        });
}

/* Get products for  dashboard */
export function getProducts(req, res) {

    Product.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).json("Cannot fetch products: " + err);
        });
}

/* Update products */
export function updateProduct(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

    const productId = req.params.id;
    const updatedData = req.body;

    Product.findByIdAndUpdate(productId, updatedData, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                res.status(404).json({
                    message: "Product not found"
                });
                return;
            }

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct
            });
        })
        .catch((err) => {
            res.status(500).json("Cannot update product: " + err);
        });
}

/* Delete products */
export function deleteProduct(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                res.status(404).json({
                    message: "Product not found"
                });
                return;
            }

            res.status(200).json({
                message: "Product deleted successfully"
            });
        })
        .catch((err) => {
            res.status(500).json("Cannot delete product: " + err);
        });
}


//get product by id
export function getProductById(req, res) {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            if (!product) {
                res.status(404).json({
                    message: "Product not found"
                });
                return;
            }

            res.status(200).json(product);
        })
        .catch((err) => {
            res.status(500).json("Cannot fetch product: " + err);
        });
}