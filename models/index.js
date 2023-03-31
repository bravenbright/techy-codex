const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Post.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

module.exports = { User, Post };
