const express = require("express");

const app = new express();

app.use(express.static(__dirname + "/web"));


const createPath = function (path = ""){
    if( path[path.length-1] === "/") {
        path += "index";
    }
    return path + ".html";
}

app.get("*",(req,res,next)=>{
    console.log(createPath(req.path));
    res.sendFile(createPath(req.path),{root:__dirname+"/static/web"});
})


app.listen(3000,()=>console.log("app start"));
