const { Router } = require("express");

const {
  getAllReview,
  getOneReview,
  createReview,
  createComment,
  updateComment,
  createRate,
  updateReview,
  deleteReview,
} = require("../controllers/ReviewControllers.js");

const reviewRouter = Router();

reviewRouter.get("/getAllReview", getAllReview);
reviewRouter.get("/getOneReview/:id", getOneReview);
reviewRouter.post("/createReview", createReview);
reviewRouter.put("/createComment/:id", createComment);
reviewRouter.put("/updateComment/:id", updateComment);
reviewRouter.put("/createRate/:id", createRate);
reviewRouter.put("/update/:id", updateReview);
reviewRouter.delete("/delete/:id", deleteReview);

module.exports = reviewRouter;
