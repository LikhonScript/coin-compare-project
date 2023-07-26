const AdModel = require("../models/adsModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { errorMesssage } = require("../Methods/helpingMethods");
// Get all ads
exports.getAllAds = async (req, res) => {
  try {
    const queryObject = {};
    const { Website, Title, Description, sort, select, image } = req.body;

    if (Title) {
      queryObject.Title = { $regex: Title, $options: "i" };
    }
    if (Website) {
      queryObject.Website = { $regex: Website, $options: "i" };
    }
    if (Description) {
      queryObject.Description = Description;
    }
    if (image) {
      queryObject.image = image;
    }
    let ads = await AdModel.find(queryObject);

    res.status(200).json({
      message: "route is working fine",
      ads,
      length: ads.length,
    });
  } catch (error) {
    res.json({
      success: false,
      error: `error ${error}`,
    });
  }
};
//create ads
exports.createAd = async (req, res) => {
  try {
    console.log("hello");
    const ad = await AdModel.create(req.body);
    res.status(201).json({
      success: true,
      ad,
    });
  } catch (error) {
    res.status(501).json({
      error: `${error}`,
    });
  }
};
// update ad --admin
exports.updateAd = async (req, res) => {
  try {
    let ad = await AdModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "ad updated",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};

// delete ad

exports.deleteAd = async (req, res) => {
  try {
    ad = await AdModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "ad deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};
exports.singleAdDetails = async (req, res) => {
  try {
    let ad = await AdModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "ad details",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};
