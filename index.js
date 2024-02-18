const express = require("express");
const connection = require("./db/connection");
const userRoute = require("./src/user/user.routes");
const noteRoute = require("./src/note/note.routes");
const userModel = require("./src/user/user.model");
const noteModel = require("./src/note/note.model");

const app = express();
app.use(express.json());

userModel.hasMany(noteModel, { foreignKey: "link" });
noteModel.belongsTo(userModel, { foreignKey: "link" });

app.use("/user", userRoute);
app.use("/note", noteRoute);

connection
  .authenticate()
  .then(() => {
    connection.sync({ alter: true });
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api", (req, res) => {
  res.send("The API Working!");
});

app.listen(3000, () => {
  console.log("server is running...");
});
