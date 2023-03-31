const { faker } = require("@faker-js/faker");
const { Post } = require("../models");

const seedPosts = async (users) => {
  const posts = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // create 3 posts per user
    for (let j = 0; j < 3; j++) {
      const name = faker.lorem.sentence(5);
      const content = faker.lorem.paragraphs(3);
      posts.push({ name, content, user_id: user.id });
    }
  }

  await Post.bulkCreate(posts);
};

module.exports = seedPosts;
