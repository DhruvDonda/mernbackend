const express = require("express");
const path = require("path");
var http = require('http');
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register=require("./models/register")

const port = process.env.PORT || 3850;
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/commingSoon.hbs", (req, res) => {
    res.render("commingSoon");

})

app.get("/views/signin.hbs", (req, res) => {
    res.render("signin");

})

app.get("/signin.hbs", (req, res) => {
    res.render("signin");

})

app.get("/signup.hbs", (req, res) => {
    res.render("signup");

})
app.get("/views/signup.hbs", (req, res) => {
    res.render("signup");

})


// create a new user in our database 

 app.post("/register", async(req, res) => {
try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
        const registerEmployee = new Register({
            phoneNo:req.body.phoneNo,
            email:req.body.email,
            password:password,
            confirmpassword:cpassword,
            
        })
  
const registered= await registerEmployee.save();

res.status(201).render("index");

    }else{
        res.send("password are not matching ")
    }
} catch (error) {
    console.log(error)
    res.status(400).send(error);
}
})
// logoin check

app.post("/signin", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if (useremail.password === password) {
            res.status(201).render("index");
            
        }
        else{
            res.send("password are not matching")
        }

    }
// console.log(`${email}and password is ${password}`);
    catch (error) {
        res.status(400).send("invalid Email");
    }


})

app.listen(port, () => {
    console.log(`server is running at port no: ${port}`);
})
