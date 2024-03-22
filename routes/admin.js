const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { verifyTokenAndAdmin } = require("../middleware/auth");
const user = require("../model/user");
const Product = require("../model/product");


// ---------------login----------------------
router.post('/login', (req, res) => {

    //admin details
    const admin = {
        name: 'admin',
        username: 'admin@root.com',
        password: 'admin123',
    }

    try {
        const { password } = req.body;

        //validate admin input
        if (!password) {
            return res.status(400).send("all input is required");
        }

        if (password === admin.password) {

            //create token
            const token = jwt.sign(
                {
                    user_id: admin.name, email: admin.username
                },
                process.env.ADMIN_KEY,
                {
                    expiresIn: '2h',

                }
            );

            res.status(201).send({ user: admin.name, email: admin.username, auth: token });

        } else {
            res.status(400).send("invalid password")
        }


    } catch (err) {
        console.log(err);
    }



})




// -------------add product------------------
router.post('/addProduct', async (req, res) => {

    try {
        const { title, desc, material, categories, size, color, price, brand, reviews, availability  } = req.body;


        // Validate if product exist in our database
        const oldProduct = await Product.findOne({ title })
        if (oldProduct) {
            return res.status(409).send("Product Already Exist. Please update your existing product")
        }

        // add product in our database
        const product = await Product.create(req.body);
        res.status(201).json(product);


    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }

})


// -----------update product-----------------
router.post('/updateProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.id;

    // Validate if product exist in our database
    const oldProduct = await Product.findById(productId)
    if (!oldProduct) {
        return res.status(404).send("Product Not Found. Please update your existing product")
    }

    try {
        await Product.findByIdAndUpdate(productId, {
            $set: req.body
        }, { new: true });
        res.status(200).send('product updated');

    } catch (err) {
        res.status(500).json(err)
    }


})


// -----------delete product-----------------
router.post('/deleteProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.id;
    try {

        await Product.findByIdAndDelete(productId)
        res.status(200).send('product deleted');

    } catch (err) {
        res.status(500).json(err);
    }
})


// -------------get product------------------
router.get('/getProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.id;

    try{

        const product =await Product.findById(productId);
        res.status(200).json(product);

    }catch(err) {
        res.status(500).json(err);
    }

})


// ----------get all product-----------------
router.post('/getAllProducts', verifyTokenAndAdmin, async (req, res) => {

    try{

        const products =await Product.find();
        res.status(200).json(products);

    }catch(err) {
        res.status(500).json(err);
    }
})



module.exports = router;