const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")

router.get("/login", async(req,res)=>{
    res.render("login.hbs",{
        title: "Vista login"
    })
})

router.get("/register", async(req,res)=>{
    res.render("register.hbs",{
        title: "Vista Registro"
    })
})

router.get("/profile", async(req,res)=>{
    res.render("profile.hbs",{
        title: "Vista profile",
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        email: req.session.email,
        age: req.session.age,
        rol: req.session.rol
    })
})



module.exports =router