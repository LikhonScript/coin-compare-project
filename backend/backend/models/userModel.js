const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,

    validate: validator.isEmail,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
  country: {
    type: String,
  },
  contact: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "User",
  },

  prefernces: [
    {
      info: {
        type: Object,
      },
    },
  ],
  // coin: {
  //   type: Object,
  //   default: null,
  // },

  resetPasswordToken: String,
  resetPasswordExipre: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, "thisisadeelfirstproject", {
    expiresIn: "4d",
  });
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
