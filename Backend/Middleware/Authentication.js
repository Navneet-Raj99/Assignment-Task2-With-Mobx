const JWT = require("jsonwebtoken");
const user = require("../Models/AuthModel");
const authenticate=async (req,res,next)=>
{

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
     
    next();
}

module.exports=authenticate;