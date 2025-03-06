const { Router } = require("express");
const isAuthenticated = require("../middlewares/auth");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const { login, logout ,profile} = require("../controllers/userController");

const appRouter = Router();
appRouter.post("/login", login); // POST- http://localhost:3001/api/login
appRouter.post("/logout", logout); // POST - http://localhost:3001/api/logout
// appRouter.post("/login", (req,res)=>{res.send("login")});
// appRouter.use(isAuthenticated); -> la comenté x mientras porque no me acuerdo como manejarla
appRouter.get("/profile",isAuthenticated, profile)
appRouter.use("/user", isAuthenticated, userRouter); //el delete y el post van por acá (register)
appRouter.get("/users", isAuthenticated, userRouter);
appRouter.use("/products", isAuthenticated, productRouter);
//para el login usá passport.js min 15 de "Node.js Passport Login System Tutorial"
//appRouter.post("/user", userRouter);//acá va el /user/login o en el archivo userRouter??
//appRouter.delete("/", userRouter); // aun no funciona
module.exports = appRouter;

// const { isAuthenticated } = require("../middlewares/auth");
// const AppService = require("../Services/AppService");
// const AppController = require("../Controller/AppController");

// const appService = new AppService();
// const appController = new AppController(appService);

// appRouter.get("/info", appController.getInfo.bind(appController));

// appRouter.get("/", isAuthenticated, appController.home);

// appRouter.get("*", appController.notFound);
