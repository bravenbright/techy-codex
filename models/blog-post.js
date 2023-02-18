const { Model, DataTypes } = require("sequelize");
const sequelize = require(".../config/connection");
const { DATE } = require("sequelize/types/data-types");

class Post extends Model { }

Post.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },

      user_id: {
         type: DataTypes.INTEGER,
         refernces: {
            model: "user",
            key: "id",
         },
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },

      date_created: {
         type: DataTypes.DATE
      },

      category: {
         type: DataTypes.STRING,
         allowNull: true,
         references: {
            model: "user",
            key: "id"
         },
      }
   },
   {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: "posts"
   }
);

module.exports = Post;