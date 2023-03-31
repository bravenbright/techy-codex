const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  const users = [
    {
      username: "dev",
      email: "dev@example.com",
      password: await bcrypt.hash("tester", 10),
    },
  ];

  // create 5 additional users
  for (let i = 0; i < 5; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email(...username.split(" "));
    const password = await bcrypt.hash(faker.internet.password(6), 10);
    users.push({ username, email, password });
  }

  const seededUsers = await User.bulkCreate(users, { returning: true });
  return seededUsers;
};

module.exports = seedUsers;
