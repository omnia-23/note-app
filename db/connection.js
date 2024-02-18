const {Sequelize} =require("sequelize")

// const connection =new Sequelize({
//     host:'localhost',
//     database:"notes",
//     username:'root',
//     password:'',
//     dialect:'mysql'
// })
const connection = new Sequelize('notes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = connection;
