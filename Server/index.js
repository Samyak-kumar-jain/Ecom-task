require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectToDatabase = require('./db');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/authrotes')
const adminRouter = require('./routes/Product/Products_routes')
const shopRouter = require("./routes/Shop/Shoproutes")
const cartRouter = require("./routes/Cart/cartRoutes")
const adressRouter = require("./routes/Shop/Adreesroutes")

const path  = require("path")
const port = process.env.PORT || 5000;


connectToDatabase();
const _dirname = path.resolve();
app.use(
    cors({
        origin: 'https://ecom-task-uzjg.onrender.com


            ',
        methods: ['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-control",
            "Expires",
            "Pragma",
        ],
        credentials:true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products',adminRouter)
app.use('/api/shop/products' , shopRouter );
app.use('/api/shop/cart',cartRouter);
app.use('/api/shop/address',adressRouter);
app.use(express.static(path.join(_dirname,"/Client/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Client","dist","index.html"))
})

 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
