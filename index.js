const express = require('express')
const app  = express();
const appointRouter =require('./routes/appointmentRoutes')
const userRouter= require('./routes/userRoutes')
const workerRouter =require('./routes/workerRoutes')
const Db = require('./Db/Db');const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
PORT =5000;
Db();

app.use(express.json({limit:'8mb'}))
const corsOption = {
    credentials: true,
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use('/api',appointRouter)
app.use('/api',userRouter)
app.use('/api',workerRouter)




app.listen(PORT,()=>{
    console.log(`Server runing at PORT : ${PORT}`)
})