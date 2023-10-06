const { Router } = require("express");

const {
  getAllUser,
  getOneUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/UserControllers.js");

const userRouter = Router();

userRouter.get("/getAll", getAllUser);
userRouter.get("/getOne/:email", getOneUser);
userRouter.post("/register", registerUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
