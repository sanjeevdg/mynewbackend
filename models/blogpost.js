const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const BlogPost = sequelize.define('blogposts', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },

   btitle: {
      type: Sequelize.STRING,
      allowNull: false,
   },   
   bByline: {
      type: Sequelize.STRING,
      allowNull:true,
   },
   bCategory: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   bSummary: {
      type:Sequelize.STRING,
      allowNull:true,
   },
   btext: {
      type: Sequelize.TEXT,
      allowNull: false,
   },   
   bYoutubeLink: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   bMp4Link: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   bImage: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   bLink: {
      type:Sequelize.STRING,
      allowNull:true,
   },
   bLinkText: {
      type:Sequelize.STRING,
      allowNull:true,
   }   
});

//export default User;
module.exports = BlogPost;
