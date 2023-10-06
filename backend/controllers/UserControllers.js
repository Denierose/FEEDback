const UserModel = require("../models/UserModel.js");

exports.getAllUser = async (req, res) => {
  await UserModel.find().then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  });;  
};

exports.getOneUser = async (req, res) => {
  const { email } = req.params;
  await UserModel.findOne({email: email}).then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  });;  
};

exports.loginUser = async (req, res) => {
  const Idtoken = req.query.token;
  await console.log(Idtoken, res);
}

exports.registerUser = async (req, res) => {
  await UserModel.create(req.body)
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndUpdate(id, req.body)
    .then(() => res.send("Update successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
  });
};


