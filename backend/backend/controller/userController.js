const {
  storeJwtCookie,
  getDecodedData,
  errorMesssage,
} = require("../Methods/helpingMethods");
const { findById } = require("../models/userModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
//register a user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, country, contact, image } = req.body;
    const bodyObject = {};
    if (name) {
      bodyObject.name = name;
    }
    if (email) {
      bodyObject.email = email;
    }
    if (password) {
      bodyObject.password = password;
    }
    if (role) {
      bodyObject.role = role;
    }
    if (country) {
      bodyObject.country = country;
    }
    if (contact) {
      bodyObject.contact = contact;
    }
    if (image) {
      bodyObject.image = image;
    }
    bodyObject.avatar = {
      public_id: "this is sample public_id",
      url: "this is sample url",
    };

    if (!name || !email || !password) {
      errorMesssage(res, "please enter complete information");
    } else {
      const user = await userModel.create(bodyObject);
      console.log(bodyObject);
      storeJwtCookie(user, res);
    }
  } catch (error) {
    errorMesssage(res, `${error}`);
  }
};
//user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!email || !password) {
      errorMesssage(res, "please enter email and password to login");
    } else if (!user) {
      errorMesssage(res, "Account does not exsist");
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      console.log(isMatched);
      if (isMatched) {
        console.log(user);
        storeJwtCookie(user, res);
      } else {
        errorMesssage(res, "Incorrect Password");
      }
    }
  } catch (error) {
    errorMesssage(res, `${error}`);
  }
};
//log out User
exports.logOutUser = async (req, res) => {
  try {
    res
      .cookie("token", null, {
        sameSite: "None",
        secure: true,
        httpOnly: true,

        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "user successfully logged out",
      });
  } catch (error) {
    errorMesssage(res, `${error}`);
  }
};

//get user
exports.getUser = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    const decodedUser = await userModel.findById(getDecodedData(token));
    res.json({
      success: true,
      user: decodedUser,
    });
  } else {
    errorMesssage(res, "please login first to get user details");
  }
};
// update user Password
exports.updatePassword = async (req, res) => {
  const { currentPassword, password } = req.body;
  const { token } = req.cookies;
  const bodyObject = {};
  if (token) {
    const user = await userModel.findById(getDecodedData(token));
    if (!currentPassword) errorMesssage(res, "please enter current password");
    else {
      const isMatched = await bcrypt.compare(currentPassword, user.password);
      console.log(isMatched);
      if (isMatched) {
        if (password) {
          bodyObject.password = password;
        } else {
          errorMesssage(res, "Please enter new password to update");
        }
        const user = await userModel.findById(getDecodedData(token));

        user.password = password;
        await user.save();

        res.json({
          success: true,
          user,
          message: "user updated successfully",
        });
      } else {
        errorMesssage(res, "sorry your current password is incorrect");
      }
    }
  } else {
    errorMesssage(res, "Please login first to update password");
  }
};
//update profile
exports.updateProfile = async (req, res) => {
  const { token } = req.cookies;
  const bodyObject = {};
  const { name, email, country, contact } = req.body;
  if (token) {
    if (name) bodyObject.name = name;
    if (email) bodyObject.email = email;
    if (country) bodyObject.country = country;
    if (contact) bodyObject.contact = contact;
    const updatedUser = await userModel.findByIdAndUpdate(
      getDecodedData(token),
      bodyObject,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.json({
      success: true,
      user: updatedUser,
      message: "user updated successfully",
    });
  } else {
    errorMesssage(res, "please login first to update your profile");
  }
};
//get all users (except admin)---admin
exports.getAllUsers = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const decodedUser = await userModel.findById(getDecodedData(token));
    if (decodedUser.role == "Admin") {
      const users = await userModel.find({ role: "User" });
      res.json({
        success: true,
        users,
      });
    } else {
      errorMesssage(res, "you don't have access to this part");
    }
  } else {
    errorMesssage(res, "please login to see the users");
  }
};
//get single user ---admin
exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const { token } = req.cookies;
    if (token) {
      const decodedUser = await userModel.findById(getDecodedData(token));
      if (decodedUser.role == "Admin") {
        const user = await userModel.findById(req.params.id);
        res.json({
          success: true,
          user,
        });
      } else {
        errorMesssage(res, "you don't have access to this part");
      }
    } else {
      errorMesssage(res, "please login to see the users");
    }
  } catch (error) {
    console.log(id);
    errorMesssage(res, `${error}`);
  }
};
//see if the user loggedIn or not
exports.userLogResult = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (token) {
    res.json({
      success: true,
      message: "user logged in",
    });
  } else if (!token) {
    errorMesssage(res, "user not logged in");
  }
};
//send email
exports.sendEmails = async (req, res) => {
  const { name, details, email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adeel.saeed158@gmail.com",
      pass: "bdojehqvdjharcys",
    },
  });
  const option = {
    from: "adeel.saeed158@gmail.com",
    to: `${email}`,
    subject: `${name}`,
    text: `${details}`,
  };
  transporter.sendMail(option, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("mail sent", info);
    }
  });
  res.json({
    success: true,
    message: "email sent successfully",
  });
};
//delete user
exports.deleteUser = async (req, res) => {
  try {
    user = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};
// add prefernces for user
exports.Userprefernces = async (req, res) => {
  try {
    const { info } = req.body;
    const bodyObject = {};
    if (info) {
      bodyObject.info = info;
    }

    const updatedUser = await userModel.updateOne(
      { _id: req.params.id },
      {
        $push: { prefernces: bodyObject },
      }
    );
    res.json({
      success: true,
      message: "prefernce deleted",
    });
  } catch (error) {
    errorMesssage(res, `${error}`);
  }
};
//delete prefernces
exports.deletePreferences = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedUser = await userModel.updateOne(
      { _id: req.params.id },
      {
        $pull: { prefernces: { _id: id } },
      }
    );
    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    errorMesssage(res, `${error}`);
  }
};
