const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  userLogResult,
  sendEmails,
  deleteUser,
  Userprefernces,
  deletePreferences,
} = require("../controller/userController");
const userRouter = express.Router();
userRouter.route("/user/register").post(registerUser);
userRouter.route("/user/login").post(loginUser);
userRouter.route("/user/logout").post(logOutUser);
userRouter.route("/user/me").get(getUser);
userRouter.route("/user/updatepassword").put(updatePassword);
userRouter.route("/user/updateprofile").put(updateProfile);
userRouter.route("/admin/users").get(getAllUsers);
userRouter.route("/userlog").get(userLogResult);
userRouter.route("/sendemails").post(sendEmails);
userRouter.route("/admin/user/:id").get(getSingleUser).delete(deleteUser);
userRouter.route("/user/preferences/:id").put(Userprefernces);
userRouter.route("/user/removepreferences/:id").put(deletePreferences);

module.exports = userRouter;
