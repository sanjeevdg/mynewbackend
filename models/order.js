const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const Order = sequelize.define('orders', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },

   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   mobile: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   details: {
      type: Sequelize.TEXT,
      allowNull: false,
   }
   
});

//export default User;
module.exports = Order;
