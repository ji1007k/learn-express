const express = require('express');
const router = express.Router();

const User = require("../models/userModel");

/**
 * 회원 목록 조회
 */
router.get("/", async function (req, res, next) {
  try {
    const option = {
      $and: [
        { user_id: { $ne: null } },
        // { status: "active" },
      ],
      $or: [
        { social_id: { $ne: null }},
        { social_id: req.query.social_id },
        { name: req.query.name }
      ]
    };

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
        const user = await User.findOne({ _id: req.params._id });
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
