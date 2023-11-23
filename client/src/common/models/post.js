const { UserStory } = require("../data/list_stories");

module.exports = {
  Post: {
    id: "",
    user: UserStory,
    isLiked: false,
    description: "",
    totalLike: 0,
    totalCmt: 0,
    image: ""
  }
};
