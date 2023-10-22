const express = require("express")
const path = require('path');
const { default: mongoose } = require("mongoose")
const app = express()
const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const FileStore = require("session-file-store")
const fileStorage = FileStore(session)

const port = 8080;
const sessionRouter = require("./routes/session.router.js")
const viewsRouter = require("./routes/views.router.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine)
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + "/views"))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })


app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})