const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const {verifyToken} = require("../middleware/auth")
const Address = require("../model/address");

router.post("/addAddress", verifyToken, async (req, res) => {
    try {
      // Get address input
      const { addressees_name, house_number, street_name, locality_name, town, postcode } = req.body ;
    //   console.log(req.user?.user_id);
  
      // Create address in our database
      const address = await Address.create({
        addressees_name,
        house_number,
        street_name, 
        locality_name, 
        town, 
        postcode,
        user_id:req?.user?.user_id
      });
  
     
      //return new address
      const { ...others } = address._doc;
  
      res.status(201).json({
        success: 1,
        status: 201,
        message: "address added successfully",
        data: others,
      });
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      res.status(500).json(err);
    }
  });



  router.get("/getAddress", verifyToken, async(req, res) => {
    try{


        const userId  = req.user?.user_id;

        const data =await Address.find({user_id:userId});
        res.status(200).json({
            status:200,
            success:1,
            message:"",
            data:data
        })

    }catch(err){
        res.status(500).json(err);

    }
  });

// delete address
  router.delete('/address/:id', async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).send('Address not found');
        }
        res.status(200).json({
          status:200,
          success:1,
          message:"Deleted Succesfully",
          data:data
      })

  }catch(err){
      res.status(500).json(err);

  }
    
});

// edit address

router.put('/address/:id', async (req, res) => {
  try {
    const addressId = req.params.id;
    const updatedAddress= req.body;

    const address = await Address.findByIdAndUpdate(addressId, updatedAddress, {new: true});
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
  }
  return res.json({ message: 'Address updated successfully', address });
  } catch (error) {
    console.error('Error updating address:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
})

module.exports = router;