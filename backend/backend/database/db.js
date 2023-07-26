const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://adeelsaeed158:Wweraw2014@cluster0.fvopecy.mongodb.net/bigProject?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`database connected with server `);
    })
    .catch((err) => {
      console.log("error occured" + err);
    });
};
module.exports = dbConnection;
