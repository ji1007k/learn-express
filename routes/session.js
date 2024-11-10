const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const session = require('express-session');
const router = express.Router();

router.use(session({
    secret: 'your_secret_key', // 세션 암호화 키
    resave: false,  // 세션을 항상 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션도 저장할지 여부
    cookie: { secure: false } // secure는 HTTPS에서만 작동, 개발환경에서는 false로 설정
  }));

/**
 * 로그인
 */
router.post("/login", async (req, res) => {
  const { social_id, password } = req.body;

  // 사용자 찾기
  const option = {
    _id: { $ne: null },         // _id가 null이 아닌 조건
    status: "active",           // status가 'active'인 조건
    social_id: social_id
  };

  const user = await User.findOne(option); 
  console.log(req.body);
  console.log(user);

  if (!user) {
    return res.status(401).send("사용자를 찾을 수 없습니다.");
  }
 
  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("비밀번호가 일치하지 않습니다.");
  }

  // 로그인 성공 시 세션에 사용자 정보 저장
  req.session.user = { social_id: user.social_id };

  res.send("로그인 성공");
});

// 로그아웃 라우터
router.get("/logout", (req, res) => {
  console.log(req.session.user);

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("로그아웃 실패");
    }
    res.send("로그아웃 성공");
  });
});

module.exports = router;
