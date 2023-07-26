const ProductModel = require("../models/productModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { errorMesssage } = require("../Methods/helpingMethods");
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const queryObject = {};
    const {
      Symbol,
      Title,
      minSupply,
      maxSupply,
      sort,
      select,
      limit,
      page,
      image,
    } = req.body;

    if (Title) {
      queryObject.Title = { $regex: Title, $options: "i" };
    }
    if (Symbol) {
      queryObject.Symbol = { $regex: Symbol, $options: "i" };
    }
    if (minSupply) {
      queryObject.minSupply = { $gt: minSupply, $lt: maxSupply };
    }
    if (image) {
      bodyObject.image = image;
    }
    let products = ProductModel.find(queryObject);
    if (sort) {
      let sortFix = sort.split(",").join(" ");
      queryObject.sort = sortFix;

      products = products.sort(sortFix);
    }
    if (select) {
      let selectFix = select.split(",").join("");
      products = products.select(selectFix);
    }
    let Limit = Number(limit) || 20;
    let Page = Number(page) || 1;
    let skip = (Page - 1) * Limit;
    products = await products;
    res.status(200).json({
      message: "route is working fine",
      products,
      length: products.length,
    });
  } catch (error) {
    res.json({
      success: false,
      error: `error ${error}`,
    });
  }
};
//create products
exports.createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(501).json({
      error: `${error}`,
    });
  }
};
// update product --admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "product updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};

// delete product

exports.deleteProduct = async (req, res) => {
  try {
    product = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};
exports.singleProductDetails = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "product details",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};
exports.getApeData = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "clicked",
    });
  } catch (error) {
    res.json({
      message: `error${error}`,
    });
  }
};
