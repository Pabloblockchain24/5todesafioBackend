const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    category: String,
    precio: Number,
    availability: String
})



const Products = mongoose.model("productos",productSchema)


module.exports = Products