const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProductDetails,
  getApeData,
} = require("../controller/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/ApeCoin").get(getApeData);

router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(singleProductDetails);

module.exports = router;
