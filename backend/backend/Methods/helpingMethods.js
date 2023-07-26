const jwt = require("jsonwebtoken");
exports.storeJwtCookie = (user, res) => {
  const token = user.getJwtToken();
  console.log(token);
  res
    .cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,

      expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    })

    .json({
      success: true,
      user,
      token,
    });
};
exports.errorMesssage = (res, message) => {
  res.json({
    success: false,
    error: message,
  });
};
exports.getDecodedData = (token) => {
  const decodedUser = jwt.verify(token, "thisisadeelfirstproject");
  return decodedUser.id;
};
