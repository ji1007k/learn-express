const express = require('express');
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();


/**
 * 회원 목록 조회
 */
router.get("/", async function (req, res, next) {
  try {
    const option = {
      _id: { $ne: null },         // _id가 null이 아닌 조건
      status: "active",           // status가 'active'인 조건
    };

    // social_id 파라미터가 있을 경우 $or 조건에 추가
    if (req.query.social_id) {
      option.$or = option.$or || [];
      option.$or.push({ social_id: { $regex: req.query.social_id, $options: 'i' } });
    }

    // name 파라미터가 있을 경우 $or 조건에 추가
    if (req.query.name) {
      option.$or = option.$or || [];
      option.$or.push({ name: { $regex: req.query.name, $options: 'i' } });
    }

    const user = await User.find(option);
    res.send(user);
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
});


/**
 * 회원 등록
 */
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await user.save();
    res.send(user);
  } catch (error) {
    next(error); 
  }
});

/**
 * 회원 상세 조회
 */
router.get("/:_id", async (req, res, next) => {
    try {
        // const user = await User.findOne({ _id: req.params._id }); 
        const user = await User.findById(req.params._id); 

        if (!user) {
          return res.status(404).send("User not found");
        }

        res.send(user);
    } catch (error) {
        next(error);
    }
});

/**
 * 회원 수정
 */
router.put("/:_id", async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new: true }
        );

        console.log(user);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

/**
 * 회원 삭제
 */
router.delete("/:_id", async (req, res, next) => {
    try {
        const option = {
            _id: req.params._id
        }

        await User.deleteOne(option);
        //   await User.deleteMany({ email: req.params.email });
        res.send({ success: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
