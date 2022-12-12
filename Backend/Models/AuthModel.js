const mongoose =require('mongoose');
const {Schema} = mongoose; // Taking Only Schema of Mongoose by destructuring

const AuthSchema= new Schema({
    name:{
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
       type:String,
       required:true
   },
   date:{
       type:Date,
       default:Date.now
   }
   });
   const User=mongoose.model('Auth',AuthSchema)
   User.createIndexes();
   module.exports=User;