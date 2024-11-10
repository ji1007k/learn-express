const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
//const uri =
//  "mongodb+srv://<user>:<password>@<atlashost>/board?retryWrites=true&w=majority";
const uri = "mongodb+srv://ch_admin:ch_admin@test.ywhxl.mongodb.net/comm_hub?retryWrites=true&w=majority";

module.exports = function () {
  return mongoose.connect(uri, { useNewUrlParser: true });
};
