const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
  // const token = req.header("set-cookie");
  // console.log(req.headers)
  // const token = req.headers("cookie")
  // const token = req.headers.cookie
  // console.log({token})
  const {token} = req.cookies
  if(!token) return res.status(404).json({ message: "No token, authorization denaied" })
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(404).json({ message: "Invalid token" });
    }
    next();

  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded;
  //   } catch (err) {
  //     return res.status(404).json({ message: "Unauthorized token" });
  //   }
    // next();
  // } else {
  //   return res.status(404).json({ message: "Unauthorized..." });
  // }
};
module.exports =  isAuthenticated ;
