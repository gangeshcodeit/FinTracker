const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User2 = require("./modal");

app.use(bodyParser.urlencoded({extended:true}));
// app.use(require("express-session")({
//     secret:"Rust is a dog",
//     resave:false,
//     saveUninitialized:false
// }));

const staticDir = path.join(__dirname);
console.log(staticDir);

app.get("/",(req,res)=>{
  res.sendFile(path.join(staticDir, 'login.html'));
})

app.get("/index",(req,res)=>{
  res.sendFile(path.join(staticDir, 'index.html'));
})

// app.get('/search1', (req, res) => {
//   res.sendFile(path.join(staticDir, 'search1.html'));
// });

// app.get('/search2', (req, res) => {
//     res.sendFile(path.join(staticDir, 'search2.html'));
// });

// app.get('/search3', (req, res) => {
//   res.sendFile(path.join(staticDir, 'search3.html'));
// });

// app.get('/search4', (req, res) => {
//   res.sendFile(path.join(staticDir, 'search4.html'));
// });

// app.get('/search5', (req, res) => {
//   res.sendFile(path.join(staticDir, 'search5.html'));
// });

// app.get('/search6', (req, res) => {
//   res.sendFile(path.join(staticDir, 'search6.html'));
// });

// app.get('/firstpage', (req, res) => {
//   res.sendFile(path.join(staticDir, 'firstpage.html'));
// });

// app.get('/secondpage', (req, res) => {
//   res.sendFile(path.join(staticDir, 'secondpage.html'));
// });

// app.get('/third', (req, res) => {
//   res.sendFile(path.join(staticDir, 'third.html'));
// });

// app.get('/fourth', (req, res) => {
//   res.sendFile(path.join(staticDir, 'fourth.html'));
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(staticDir, 'login.html'));
// });

// app.get('/getcar', (req, res) => {
//   res.sendFile(path.join(staticDir, 'getcar.html'));
// });


// app.get('/final', (req, res) => {
//   res.sendFile(path.join(staticDir, 'final.html'));
// });


app.post("/index.html", async (req, res) => {
    const user = await User2.create({
        registerName: req.body.registerName,
        registerEmail: req.body.registerEmail,
        registerPassword: req.body.registerPassword
    });
   res.send("user created");
  // res.sendFile(path.join(staticDir, ''));
    return res.status(200).json(user);
  });



  app.post("/", async function(req, res){
    try {
        // check if the user exists
        const user = await User2.findOne({ registerName: req.body.registerName });
        if (user) {
          //check if password matches
          const result = req.body.registerPassword === user.registerPassword;
          if (result) {
            res.sendFile(path.join(staticDir, 'index.html'));
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});



mongoose.connect("mongodb://127.0.0.1:27017/loginPage")
.then(()=>{
    console.log("connected to database!");
    app.listen(4550,()=>{
        console.log("Server is running on port 4550");
    })
}).catch(()=>{
    console.log("connection failed");
})