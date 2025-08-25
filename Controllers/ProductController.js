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


//availability 
export async function getAvailability(req, res) {
  try {
    const categories = ["Groceries", "Personal Care", "Household", "Stationery"];
    const result = [];

    for (const cat of categories) {
      const available = await Product.countDocuments({ category: cat, availability: true, quantity: { $gt: 0 } });
      const outOfStock = await Product.countDocuments({ category: cat, $or: [{ availability: false }, { quantity: 0 }] });
      result.push({ category: cat, available, outOfStock });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching availability", error: err });
  }
}

//low stock table
export async function getLowStock(req, res) {
  try {
    const min = 5;
    const lowStockProducts = await Product.find({ quantity: { $lt: min } });
    res.status(200).json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching low stock products", error: err });
  }
}

//category graph
export async function getCategoryGraph(req, res) {
  try {
    const distribution = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);
    res.status(200).json(distribution);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category distribution", error: err });
  }
}