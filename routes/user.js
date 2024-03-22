
const {verifyToken} = require("../middleware/auth")
const User = require("../model/user")
const router = require("express").Router()


// ----------------user details-----------------
router.get('/userInfo', verifyToken,async (req, res) => {
    try{

   
    const email  = req.user.email;
        const user = await User.findOne({email : email}) 
const {password, ...others} = user._doc
        res.status(200).json({
            success:1, 
            status:200,
            message:"",
            data:others
        });

   
}catch(err){
        
}
})



module.exports = router