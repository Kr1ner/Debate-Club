const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.put("/:id" , async (req,res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{ new:true });
            res.status(200).json(updatedUser);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("You can delete your account only");
    }
});

router.delete("/:id" , async (req,res) => {
    if(req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("You can update your account only");
    }
});

router.get(":/id" , async (req,res) => {
    try{ 
        const user = await User.findById(req.params.id);
        /*const {password, ...others} = user._doc;
        res.status(200).json(others);*/
    }
    catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;