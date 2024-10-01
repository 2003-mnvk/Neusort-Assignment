const express = require('express');
const multer = require('multer');
const {
    getProducts,
    getProductById,
    addToCart,
    createProduct,
    getOrderHistory,
    updateProfile,
    uploadProductImage,
} = require('../controllers/productController');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });

// Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/cart', addToCart);
router.post('/products', upload.single('image'), createProduct);
router.get('/orders', getOrderHistory);
router.put('/profile', updateProfile);
router.post('/upload', upload.single('image'), uploadProductImage);

module.exports = router;
