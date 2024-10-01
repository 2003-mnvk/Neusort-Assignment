const Product = require('../models/Product');

// 1. Fetch all product listings (with pagination)
exports.getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// 2. Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// 3. Add product to cart (for now, assume cart management)
exports.addToCart = (req, res) => {
    // Mock implementation, you can replace this with your own logic
    res.status(200).json({ message: 'Product added to cart' });
};

// 4. Create a new product listing
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({
            name,
            description,
            price,
            image: req.file?.filename,
        });
        await product.save();
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// 5. Retrieve a user's order history (mock example)
exports.getOrderHistory = (req, res) => {
    // Mock data for user's order history
    res.status(200).json([{ orderId: '1234', products: ['Product A', 'Product B'] }]);
};

// 6. Update user's profile info (mock example)
exports.updateProfile = (req, res) => {
    // Mock implementation
    res.status(200).json({ message: 'User profile updated' });
};

// 7. Upload product image
exports.uploadProductImage = (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.status(200).json({ message: 'Image uploaded', file: req.file.filename });
};
