const mongoose =require('mongoose');
const {Schema} = mongoose; // Taking Only Schema of Mongoose by destructuring

const StudentSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    address:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    
    classstudy:{
        type:Number,
        required:true
    
    },
    sectionstudy:{
        type:String,
        required:true
    
    }

});

module.exports=mongoose.model('Students',StudentSchema);