const express = require("express");

const app = new express();

app.get("/",(req,res,next)=>{
    res.write("test");

})

app.listen(3000,()=>console.log("app start"));
