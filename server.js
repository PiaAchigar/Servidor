//Capa 1
//index.js (server.js)- arranque de la aplicación, llama a app.js a db.js y otros servicios
//app.js - configurar todo el codigo de express

const {app} = require("./app.js")
const { Server: HttpServer } = require("http");
const connectDB = require("./db.js")
const dotenv = require("dotenv")

const httpServer = new HttpServer(app);

dotenv.config();  // inyectar todo lo que esta en el .env como variables de entorno

const PORT = process.env.PORT || 8080;

connectDB()

httpServer.listen(PORT, () =>
  console.log(`Servidor escuchando en puerto ${PORT}`)
);

