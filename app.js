require("dotenv").config();
const express=require('express');
const app=express();
const PORT=4000;
const cors=require('cors');
const router=require('./Routes/router');
require("./db/database");



 

app.use(cors())
app.use(express.json());
app.use(router)





app.listen(PORT,()=>{
    console.log('Server started',PORT);
})