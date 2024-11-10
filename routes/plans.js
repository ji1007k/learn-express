// TODO ESMODULE로 변경하기
const express = require("express");
const router = express.Router();

const Plan = require("../models/planModel");

/**
 * 플랜 목록 조회
 */
router.get("/", async function (req, res, next) {
  //res.send('respond with plan list');
  try {
    const option = {
      $and: [
        { user_id: req.params.user_id },
        { user_id: { $ne: null } },
        { status: "active" },
      ],
    };

    const plan = await Plan.find(option);
    res.send(plan);
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
});

/**
 * 플랜 등록
 */
router.post("/", async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.send(plan);
  } catch (error) {
    next(error); 
  }
});

/**
 * 플랜 상세 조회
 */
router.get("/:_id", async (req, res, next) => {
    try {
        const plan = await Plan.findOne({ _id: req.params._id });
        res.send(plan);
    } catch (error) {
        next(error);
    }
});

/**
 * 플랜 수정
 */
router.put("/:_id", async (req, res, next) => {
    try {
        const plan = await Plan.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new: true }
        );

        console.log(plan);
        res.send(plan);
    } catch (error) {
        next(error);
    }
});

/**
 * 플랜 삭제
 */
router.delete("/:_id", async (req, res, next) => {
    try {
        const option = {
            _id: req.params._id
        }

        await Plan.deleteOne(option);
        //   await Plan.deleteMany({ email: req.params.email });
        res.send({ success: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
