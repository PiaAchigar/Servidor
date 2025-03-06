const mongoose = require("mongoose");
//mongodb+srv://achigarpia:<db_password>@cluster0.9lob2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const connectDB = async()=>{
  // try{
  //   mongoose.connect(
  //     "mongodb+srv://achigarpia:6hYUReXYEjM3BRSa@clusteralmacen.98ovoph.mongodb.net/?retryWrites=true&w=majority"
  //   )
  // }catch(err){
  //   console.log(err)
  // }
//"mongodb://localhost/merndb"
  const mongoURI = process.env.MONGODB_URI
  // console.log(mongoURI)
  mongoose.connect(mongoURI).then((db)=>{
      console.log(">>> connectDB: DB is connected. Mongo!!")
  }).catch(error => {
    console.log(error)
  });

}
module.exports = connectDB