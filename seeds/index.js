const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const seedUsers = require("./userSeeds");
const seedPosts = require("./postSeeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  const seededUsers = await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedPosts(seededUsers);
  console.log("\n----- POSTS SEEDED -----\n");

  process.exit(0);
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    await User.sync();
    await Post.sync();

    seedAll();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
