const express = require("express");
const router = express.Router();
const Studentuser=require('../Models/StudentsModel')
const Authuser=require('../Models/AuthModel')
const JWT =require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

// Add student to the database
router.post('/addStudent', async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if (!auth_token) {
        return res.status(401).send("Access Denied");
      }

      let data = JWT.verify(auth_token, "mynameisnavneetraj");
      const fetcheduser = await Authuser.findById(data);
      if(fetcheduser)
      {
        let studentwillingtojoin=await Studentuser.findOne({
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            city:req.body.city,
            classstudy:req.body.classstudy,
            sectionstudy:req.body.sectionstudy
        })
        let studentwithsameemail=await Studentuser.findOne({
            email:req.body.email
        })
        if(studentwillingtojoin)
        {
            return res.json({
                Message:"Student with Corresponding Data Already Exist"
            })
        }
        if(studentwithsameemail)
        {
            res.json({
                Message:"This Email is already Used"
            })
            return;
        }
        
            if(req.body.classstudy<1 || req.body.classstudy>12)
            {
                 return res.json({
                    DataCreatingProblem:req.body.classstudy,
                    Message:"Class should be between 1 to 12"
                 })
            }
    
            if(req.body.sectionstudy!="A" && req.body.sectionstudy!="B" && req.body.sectionstudy!="C" && req.body.sectionstudy!="D")
            {
                 return res.json({
                    DataCreatingProblem:req.body.sectionstudy,
                    Message:"Section should be A or B or C or D"
                 })
            }
    
       let new_student=await Studentuser.create({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        city:req.body.city,
        classstudy:req.body.classstudy,
        sectionstudy:req.body.sectionstudy
       })
       return res.status(200).json({"progress":"New Student Added","Student Details":new_student})
    
      }
      else
      {
        res.json({
            "message":"Unauthorized Access"
        })
      }
    
    })


//Fetch All students
router.get('/fetchAllStudent',async(req,res)=>
{
    console.log(req.query.city)
    console.log(req.query.classstudy)
    console.log(req.query.sectionstudy)
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    
    let data = JWT.verify(auth_token, "mynameisnavneetraj");
    const fetcheduser = await Authuser.findById(data);
    if(fetcheduser)
    {
        let all_student=[];
        if (req.query.city != "" && req.query.classstudy != "" && req.query.sectionstudy != "")
        {
            let demo=await Studentuser.find({
                city:req.query.city,
            classstudy:req.query.classstudy,
        sectionstudy:req.query.sectionstudy});

        return res.status(200).json({
            StudentAvailable:demo
        })
    
        }
        else if (req.query.city == "" && req.query.classstudy != "" && req.query.sectionstudy != "")
        {
            
            let demo=await Studentuser.find({
            classstudy:req.query.classstudy,
        sectionstudy:req.query.sectionstudy});

        return res.status(200).json({
            StudentAvailable:demo
        })
        }
        else if (req.query.city != "" && req.query.classstudy == "" && req.query.sectionstudy != "")
        {
            let demo=await Studentuser.find({
                city:req.query.city,
            sectionstudy:req.query.sectionstudy});
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
        else if (req.query.city != "" && req.query.classstudy != "" && req.query.sectionstudy == "")
        {
            let demo=await Studentuser.find({
                city:req.query.city,
            classstudy:req.query.classstudy});
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
        else if (req.query.city != "" && req.query.classstudy == "" && req.query.sectionstudy == "")
        {
            let demo=await Studentuser.find({
                city:req.query.city});
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
        else if (req.query.city == "" && req.query.classstudy != "" && req.query.sectionstudy == "")
        {
            let demo=await Studentuser.find({
                classstudy:req.query.classstudy});
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
        else if (req.query.city == "" && req.query.classstudy == "" && req.query.sectionstudy != "")
        {
            let demo=await Studentuser.find({
                sectionstudy:req.query.sectionstudy});
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
        else if(req.query.city == "" && req.query.classstudy == "" && req.query.sectionstudy == "")
        {
            let demo=await Studentuser.find();
    
            return res.status(200).json({
                StudentAvailable:demo
            })
        }
    
        return res.status(200).json({
            StudentAvailable:demo
        })
    }
    else
    {
        res.json({
            "message":"Unauthorized Access"
        })
    }
   

})



router.get('/fetchqueryStudent',async(req,res)=>
{
    console.log(req.query.page)
    let page=req.query.page;
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    
    let data = JWT.verify(auth_token, "mynameisnavneetraj");
    const fetcheduser = await Authuser.findById(data);
    if(fetcheduser)
    {
        // let all_student=[];
        let demo;
        if(page==1)
        {
            demo=await Studentuser.find().limit(4);
        }
        else
        {
             demo=await Studentuser.find().skip(4*(page-1)).limit(4);
        }
        // console.log(demo[1]._id.toString())
        // demo.map((element)=>
        // {
        //     element._id=element._id.toString();
        //     console.log(element._id)

        //     // element.save();
        // })
        // demo.map((element)=>
        // {
        //     console.log(demo._id)
        // })
        
        console.log(demo);

        return res.status(200).json({
            StudentAvailable:demo
        })
    }
    else
    {
        res.json({
            "message":"Unauthorized Access"
        })
    }
   

})


// Fetch Particular User
router.get('/fetchParticularStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let data = JWT.verify(auth_token, "mynameisnavneetraj");
    const fetcheduser = await Authuser.findById(data);
    if(fetcheduser)
    {
        let single_student=await Studentuser.findById(req.params.id);
    if(!single_student)
    {
        return res.json({
            Message:"No Student with Particular id exist"
        })
    }
    return res.status(200).json({
        StudentRequested:single_student
    })
    }
    else
    {
        res.json({
            "message":"Unauthorized Access"
        })
    }
    
    

})

// Delete particular student
router.delete('/deleteStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let data = JWT.verify(auth_token, "mynameisnavneetraj");
    const fetcheduser = await Authuser.findById(data);
    if(fetcheduser)
    {
        let get_student=await Studentuser.findById(req.params.id);  // try catch usage
    if(!get_student)
    {
        return res.json({
            Message:"No Student With this id exists"
        })
    }
    get_student=await Studentuser.findByIdAndDelete(req.params.id);
   return res.status(200).json({Message:"Student Deleted",StudentDetailsDeleted:get_student})
    }
    else
    {
        res.json({
            "message":"Unauthorized Access"
        })
    }
    
})

//update the teacher details
router.put('/updateStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let data = JWT.verify(auth_token, "mynameisnavneetraj");
    const fetcheduser = await Authuser.findById(data);
    if(fetcheduser)
    {
        let get_student = await Studentuser.findById(req.params.id)
    if(!get_student)
    {
        return res.json({
            Message:"No Student With this id exists"
        })
    }
   
        if(req.body.classstudy<1 || req.body.classstudy>12)
        {
             res.json({
                Message:"Class should be between 1 to 12"
             })
        }
        if(req.body.sectionstudy!="A" && req.body.sectionstudy!="B"&& req.body.sectionstudy!="C" && req.body.sectionstudy!="D")
        {
             return res.json({
                DataCreatingProblem:req.body.sectionstudy,
                Message:"Section should be A or B or C or D"
             })
        }
        let  studentwillingtojoin=await Studentuser.findOne({
            email:req.body.email
        })
        if(studentwillingtojoin && studentwillingtojoin.id!=req.params.id)
        {
            console.log("hello didi")
            res.json({
                Message:"This Email is already Used"
            })
            return;
        }    

    if(req.body.name){get_student.name=req.body.name}
    if(req.body.email){get_student.email=req.body.email}
    if(req.body.address){get_student.address=req.body.address}
    if(req.body.city){get_student.city=req.body.city}
    if(req.body.classstudy){get_student.classstudy=req.body.classstudy}
    if(req.body.sectionstudy){get_student.sectionstudy=req.body.sectionstudy}

   

    await get_student.save();

    get_student = await Studentuser.findById(req.params.id)
    if(!get_student)
    {
        return res.json({
            Message:"No such User Exists"
        })
    }
    return res.status(200).json({Message:"Student Details Updated",Updated_student:get_student})
    }
    else
    {
        res.json({
            "message":"Unauthorized Access"
        })
    }
    
})


module.exports=router