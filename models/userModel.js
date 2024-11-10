const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  password: { type: String },
  social_id: { type: String, required: true, unique: true },
  social_type: { type: String, default: "local" },
  email: String,
  name: String,
  profile: String,
  created_dt: {
    type: Date, // 2024-11-10T12:00:00Z (ISO 8601 형식의 문자열)
    default: Date.now, // 자동으로 현재 날짜 삽입
  },
  modified_dt: {
    type: Date,
    default: null, // 요청에 포함되지 않으면 null로 설정
  },
  status: { type: String, default: 'active' },
});

module.exports = mongoose.model("User", schema);
