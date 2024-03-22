
const router = require("express").Router()
const {verifyToken} = require("../middleware/auth")
const Product = require("../model/product")


// -------------get product------------------
router.get('/getProduct/:id', async (req, res) => {
    const productId = req.params.id;

    try{

        const product =await Product.findById(productId);
        res.status(200).json(product);

    }catch(err) {
        res.status(500).json(err);
    }

})


// ----------get all product-----------------
router.get('/getAllProducts',async (req, res) => {

    try{

        const products =await Product.find();
        res.status(200).json({
            success:1,
            status:200,
            message:'',
            data:products
        });

    }catch(err) {
        res.status(500).json(err);
    }
})






module.exports = router