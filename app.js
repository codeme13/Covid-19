const express = require('express');
require('dotenv').config();
var path = require('path');
const router = require("./routers/index");
const app = express();
const connectDB = require('./config/db');
 connectDB(); 
const bodyparser =require("body-parser");
const api = require('novelcovid');
       
    
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));  
app.use(express.urlencoded({extended:false}));
app.use(express.json());   


   var m =async(j)=>{
        try{
     const d = await api.countries(({country:'india'}));
    j[0] = d.cases;
    j[1] = d.active;
    j[2] = d.critical;
    j[3] = d.recovered;
     return j;
        }
        catch(e){
        console.log(e);
        }   
 
}


app.get('/',async(req,res)=>{
    try{
    let j = [0,0,0,0];
    const ans = await m(j);
    console.log(ans);
    const result = [
        {name:' Total Cases So far*', data : ans[0]},
        {name:'Active Covid Cases *', data : ans[1]},
        {name:'Cured-Discharged Cases*',data:ans[2]},
        { name:'Death Cases',data:ans[3]}
    ]
 
   
    res.render('index',{
        result:result
    }); 
}
catch(err)
{
    res.statusCode(400).send(err);
}
});

app.listen(port,()=>{
    console.log(`Server is running at ${port} Enjoy ..`)
}) 

