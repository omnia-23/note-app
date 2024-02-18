const { DataTypes } = require("sequelize");
const connection = require("../../db/connection.js");

const noteModel = connection.define(
  "note",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING(300),
    },

  },
  {
    timestamps: false,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

module.exports = noteModel;
