const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId 선언
    ref: 'User', // 참조할 다른 모델 이름
    required: true 
  },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  content: String,
  created_dt: {
    type: Date, // 2024-11-10T12:00:00Z (ISO 8601 형식의 문자열)
    default: Date.now // 자동으로 현재 날짜 삽입
  },
  modified_dt: {
    type: Date,
    default: null // 요청에 포함되지 않으면 null로 설정
  },
  status: String
});

module.exports = mongoose.model('Plan', schema);