const express = require("express");
const router = express.Router();
const user = require("../Models/AuthModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Registering New User on the portal

router.get('/getuserdetails',async(req,res)=>
{
    try {
        const token = req.header("AUTH_TOKEN");
        if (!token) {
            return res.status(401).send("Access Denied");
          }
          let data = JWT.verify(token, "mynameisnavneetraj");
          const fetcheduser = await user.findById(data);
          if(fetcheduser)
          {
            res.json(
                {
                    "name":fetcheduser.name,
                    "id":fetcheduser.id
                }
              )
          }
          else
          {
            res.json({
                "Message":"Wrong User Trying to access data"
            })
          }
         
        
    } catch (error) {
        res.status(500).send(`Internal Server Error due to ${error}`);
    }
})

router.post('/',
[
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Must be atleast of 5 characters").isLength({min: 5})
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.json({ errors: errors.array() });
    }
    let newusercheck = await user.findOne({ email: req.body.email });
    if (newusercheck) 
    {
        return res.json({ error: "User with this Email Already exists" });
    }
    else  // Password Encryption Process
    {
        const salt = await bcrypt.genSalt(10);
        let securedPassword= await bcrypt.hash(req.body.password,salt);

        let usertoSave= await user.create({
            name:req.body.name,
            email:req.body.email,
            password:securedPassword
        })

        // Generating Encryption Token
        let token=JWT.sign(usertoSave.id,'mynameisnavneetraj');
        res.json({
            userid:usertoSave.id,
            AUTH_TOKEN:token
        })
    }

}
);

// User Verification After when trying to login
router.post('/checkuser',[
    body("email", "Enter a valid Email").isEmail()
], 
async(req,  res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }
    let userForLogin=await user.findOne({email:req.body.email});
    if(!userForLogin)
    {
        res.json({Message:"No Such User Exist"});
    }
    else
    {
        if(await bcrypt.compare(req.body.password,userForLogin.password)) // for Password authorization
        {
            let generatedTOKEN=JWT.sign(userForLogin.id,"mynameisnavneetraj")
            console.log(generatedTOKEN);
            return res.json({
                Message:'You Succesfully Login',
                AUTH_TOKEN:generatedTOKEN,
                Name:userForLogin.name,
                Id:userForLogin._id
            })
        }
        else
        {
            return res.json({
                Message:'Enter correct Password'
            });
        }
    }
}
);

module.exports = router;