import Product from '../Models/Product.js';

/* Add products to the database */
export function addProducts(req, res) {
    const productData = req.body;
    const newProduct = new Product(productData);

    newProduct.save()
        .then(() => res.status(200).json({ message: "Product added successfully" }))
        .catch((err) => res.status(500).json({ message: "Cannot add product", error: err }));
}

/* Get products for dashboard */
export function getProducts(req, res) {
    Product.find()
        .then((products) => res.status(200).json(products))
        .catch((err) => res.status(500).json({ message: "Cannot fetch products", error: err }));
}

/* Update a product by ID */
export function updateProduct(req, res) {
    const productId = req.params.id;
    const updatedData = req.body;

    Product.findByIdAndUpdate(productId, updatedData, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        })
        .catch((err) => res.status(500).json({ message: "Cannot update product", error: err }));
}

/* Delete a product by ID */
export function deleteProduct(req, res) {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

            res.status(200).json({ message: "Product deleted successfully" });
        })
        .catch((err) => res.status(500).json({ message: "Cannot delete product", error: err }));
}

/* Get product by ID */
export function getProductById(req, res) {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            if (!product) return res.status(404).json({ message: "Product not found" });

            res.status(200).json(product);
        })
        .catch((err) => res.status(500).json({ message: "Cannot fetch product", error: err }));
}
