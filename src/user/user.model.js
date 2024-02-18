const { DataTypes } = require("sequelize");
const connection = require("../../db/connection");

const userModel = connection.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

module.exports = userModel;
