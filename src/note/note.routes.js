const { Router } = require("express");
const noteModel = require("./note.model");
const userModel = require("../user/user.model");
const { parse } = require("path");
const router = Router();

router
  .post("/", async (req, res, next) => {
    try {
      const { title, content, link } = req.body;
      const note = await noteModel.create({ title, content, link });
      if (note) res.status(200).json({ message: "success", note });
    } catch (error) {
      res.status(400).send(error.errors);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const link = req.body.link;
      const note = await noteModel.findOne({ where: { id, link } });
      if (note) {
        const deleted = await noteModel.destroy({ where: { id } });
        if (!deleted) {
          res.status(200).json({ message: "Note not found" });
        } else {
          res.status(200).json({ message: "Note deleted successfully" });
        }
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.body.link;
      const { title, content } = req.body;
      const note = await noteModel.findOne({ where: { id } });
      if (note) {
        // const { link } = note.dataValues;
        if (note.link == userId) {
          const updated = await noteModel.update(
            { title, content },
            { where: { id } }
          );
          if (updated == 1) res.status(200).json({ message: "Done" });
          res.status(200).json({ message: "no new data" });
        } else res.status(200).json({ message: "unauthorized" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .get("/all", async (req, res, next) => {
    try {
      const notes = await noteModel.findAll();
      if (notes) res.status(200).json({ message: "success", notes });
    } catch (error) {
      res.status(400).send(error.errors);
    }
  })
  .get("/details", async (req, res, next) => {
    try {
      const notes = await noteModel.findAll({
        include: {
          model: userModel,
        },
      });

      if (notes) {
        res.status(200).json({ message: "success", notes });
      } else {
        res.status(404).json({ message: "No notes found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
