const connectToMongo=require('./db')
connectToMongo();
const express=require('express');
const cors=require('cors')
const app=express();
app.use(cors())
const port=8000;

app.use(express.json())

app.use('/api/student',require('./Routes/Student'));  
app.use('/api/auth',require('./Routes/Auth'));  

app.listen(port,()=>
{
    console.log(`Server started at port http://localhost:${port}`);
})