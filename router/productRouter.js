const { Router } = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByPage,
  getProductsCreatedPerUser,
  updateProduct,
  deleteProduct,
  deleteMultipleProducts,
} = require("../controllers/productController");

const router = Router();

router.post("/", createProduct); //Crear - funciona - POST - http://localhost:3001/api/products
// router.get("/", (req,res)=>res.send("todos los productos")); //funciona
router.get("/", getProducts); //funciona
//router.get("/page/:page", getProductsByPage);
router.get("/:id?", getProductById); //Obtener - funciona
router.put("/:id", updateProduct); //Actualizar - funciona
router.delete("/:id", deleteProduct); //Eliminar - funciona
router.delete("/", deleteMultipleProducts); //eliminar varios productos

module.exports = router;
