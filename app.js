// auth
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const appRouter = require("./router/appRouter");
const cors = require("cors");
const app = express();

app.use(morgan("dev")) // es un loger que lo voy a utilizar solo en modo dev

app.use(cors()); 
app.use(express.json());//middleware para que el back entienda los datos json
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));//acá no debe de ser "false"??
app.use("/api", appRouter);
// app.post("/",appRouter);

app.use((req, res, next) => {
  console.info(`Ruta: ${req.path} Metodo: ${req.method}`);
  return next();
});

app.get("*", (req, res) => {
  console.warn(`Ruta: ${req.path} Metodo: ${req.method}`);
  return res.status(404).json({ message: "page not found" });
});

module.exports = {express, app}
