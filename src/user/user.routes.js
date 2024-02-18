const { Router } = require("express");
const userModel = require("./user.model");
const { Op } = require("sequelize");
const router = Router();

router
  .post("/signup", async (req, res, next) => {
    try {
      const { name, email, password, age } = req.body;
      const exist = await userModel.findOne({ where: { email } });
      if (exist)
        res
          .status(400)
          .json({ message: "this email exist before", user: exist });
      else {
        const user = await userModel.create({ name, email, password, age });
        if (user) res.status(200).json({ message: "success", user });
      }
    } catch (error) {
      res.status(400).send(error.errors);
    }
  })
  .post("/signin", async (req, res, next) => {
    try {
      const user = await userModel.findOne({
        where: { email: req.body.email },
      });
      if (user && user.password === req.body.password) {
        res.status(200).json({ message: "Log in successfully " });
      }
      res.status(400).json({ message: "incorrect email or password" });
    } catch (error) {
      res.status(400).send(error.errors);
    }
  })
  .patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password, age } = req.body;
      const updatedUser = await userModel.update(
        {
          name,
          email,
          password,
          age,
        },
        { where: { id } }
      );
      if (updatedUser != 1)
        res.status(200).json({ message: "no new data to update" });
      res.status(200).json({ message: "updated successfully " });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userModel.destroy({ where: { id } });
      if (!user) res.status(200).json({ message: "user not found" });
      res.status(200).json({ message: "user deleted successfully " });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  })
  .get("/char", async (req, res, next) => {
    try {
     
      const users = await userModel.findAll({
        where: {
          name: { [Op.like]: 'a%' },
          age: { [Op.lte]: 30 },
        },
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  })
  .get("/20-30", async (req, res, next) => {
    try {
      const users = await userModel.findAll({
        where: {
          age: { [Op.between]: [20, 30] },
        },
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  })
  .get("/oldest", async (req, res, next) => {
    try {
      const users = await userModel.findAll({
        order: [["age", "DESC"]],
        limit: 3,
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  })
  // send array of ids in body
  .get("/ids", async (req, res, next) => {
    const { ids } = req.body;
    console.log(ids);
    const users = await userModel.findAll({
      where: {
        id: { [Op.in]: ids },
      },
    });
    res.status(200).json({ users });
  })
  .get("/all", async (req, res, next) => {
    try {
      const users = await userModel.findAll();
      if (users) res.status(200).json({ users });
    } catch (err) {
      res.status(400).send(err.errors);
    }
  });

module.exports = router;
