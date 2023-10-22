const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const Products = require("../models/product.model.js")
const { default: mongoose } = require("mongoose")

router.post("/register", async(req,res)=>{
    let {first_name, last_name, email,age,password,rol } = req.body
    try{
        let result = await User.create({first_name, last_name, email,age,password,rol})
        res.redirect("/login")
    }catch(error){
        res.status(500).send("Error de registro")
    }
})

router.post("/login", async(req,res)=>{
    let email = req.body.email
    try{
        const data = await User.findOne({ email: email })
        if (data.password === req.body.password)
        {
            if(data.rol === "admin"){
                req.session.email = email
                req.session.first_name = data.first_name
                req.session.last_name = data.last_name
                req.session.age = data.age
                req.session.rol = data.rol
                res.redirect("/profile")
            }else{
                let products = await Products.find({})
                res.render("products.hbs",{
                    email:email,
                    rol: data.rol,
                    products,
                })
            }
        }
        else
        {
            res.redirect("../../login")
        }
    }catch(error){
        res.redirect("../../login")
    }
})


router.get("/logout", async(req,res)=>{
    req.session.destroy((error)=>{
        if(error)
        {
            return res.json({status: "Logout error", body:error})
        }
        res.redirect("../../login")
    })
})


module.exports =router