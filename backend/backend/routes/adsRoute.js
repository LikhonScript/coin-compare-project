const express = require("express");
const {
  getAllAds,
  createAd,
  updateAd,
  deleteAd,
  singleAdDetails,
} = require("../controller/adController");
const adsrouter = express.Router();
adsrouter.route("/ads").get(getAllAds);
adsrouter.route("/ad/new").post(createAd);
adsrouter.route("/ad/:id").put(updateAd).delete(deleteAd).get(singleAdDetails);
module.exports = adsrouter;
