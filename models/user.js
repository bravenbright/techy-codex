const { Model, DataTypes } = require("sequelize");
const sequelize = require(".../config/connection");
const { DATE } = require("sequelize/types/data-types");
const bcrypt = require("bcrypt");
const { beforeUpdate } = require("./blog-post");

class User extends Model {
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },

      username: {
         type: DataTypes.STRING,
         allowNull: false
      },

      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [6],
         },
            // const passErr(len) {
            // if(password len => 6) 
            // return console.log('Good Password!')
            // } else {
            //  return 
            // return console.log('Password must contain 6 characters')
      },
   },
   {
      hooks: {
         beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData, 10)
            return newUserData;         
         };
         beforeUpdate: async (updateUserData) => {
            updatedUserData.password = await bcrypt.hash(
               updatedUserData.password,
               10
            );
            return updatdeUserData;
         },
      },
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: "user",
   }
);

module.exports = User