const { MongoClient } = require("mongodb");
// const uri = "mongodb+srv://<user>:<password>@<atlashost>/board";
const uri = "mongodb+srv://ch_admin:ch_admin@test.ywhxl.mongodb.net/comm_hub?retryWrites=true&w=majority";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
