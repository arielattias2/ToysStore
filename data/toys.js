const logger = require("../startup/logger");
const { Toy } = require("../models/toyModel");
const toys = [
  {
    name: "Action Figure 1",
    info: "A cool action figure for collectors.",
    category: "Action Figures",
    img_url: "https://example.com/action_figure_1.jpg",
    price: 19.99,
    user_id: "user123",
  },
  {
    name: "Doll 1",
    info: "A lovely doll for kids.",
    category: "Dolls",
    img_url: "https://example.com/doll_1.jpg",
    price: 15.99,
    user_id: "user456",
  },
  {
    name: "Building Blocks Set 1",
    info: "Creative building blocks for children.",
    category: "Building Blocks",
    img_url: "https://example.com/building_blocks_1.jpg",
    price: 29.99,
    user_id: "user789",
  },
  {
    name: "Educational Puzzle",
    info: "Learn while you play with this educational puzzle.",
    category: "Puzzles",
    img_url: "https://example.com/educational_puzzle.jpg",
    price: 12.99,
    user_id: "user123",
  },
  {
    name: "Remote Control Car",
    info: "Race around with this fun remote control car.",
    category: "Remote Control Toys",
    img_url: "https://example.com/rc_car.jpg",
    price: 39.99,
    user_id: "user456",
  },
  {
    name: "Stuffed Animal",
    info: "A cuddly stuffed animal for bedtime companionship.",
    category: "Stuffed Animals",
    img_url: "https://example.com/stuffed_animal.jpg",
    price: 9.99,
    user_id: "user789",
  },
  {
    name: "Board Game: Adventure Quest",
    info: "Embark on an adventure with this exciting board game.",
    category: "Board Games",
    img_url: "https://example.com/adventure_quest_board_game.jpg",
    price: 24.99,
    user_id: "user123",
  },
  {
    name: "Art Set: Paint and Create",
    info: "Unleash your creativity with this art set.",
    category: "Arts and Crafts",
    img_url: "https://example.com/art_set.jpg",
    price: 18.99,
    user_id: "user456",
  },
  {
    name: "RC Drone with Camera",
    info: "Capture stunning aerial photos with this RC drone.",
    category: "Drones",
    img_url: "https://example.com/rc_drone.jpg",
    price: 79.99,
    user_id: "user789",
  },
  {
    name: "Science Experiment Kit",
    info: "Explore the world of science with this kit.",
    category: "Educational Kits",
    img_url: "https://example.com/science_experiment_kit.jpg",
    price: 29.99,
    user_id: "user123",
  },
  {
    name: "Building Blocks Set 2",
    info: "Another set of creative building blocks.",
    category: "Building Blocks",
    img_url: "https://example.com/building_blocks_2.jpg",
    price: 34.99,
    user_id: "user456",
  },
  {
    name: "Puzzle Game 1",
    info: "Classic puzzle game for hours of fun.",
    category: "Puzzles",
    img_url: "https://example.com/puzzle_1.jpg",
    price: 10.99,
    user_id: "user789",
  },
  {
    name: "Robot Toy",
    info: "Interactive robot toy for tech-savvy kids.",
    category: "Tech Toys",
    img_url: "https://example.com/robot_toy.jpg",
    price: 49.99,
    user_id: "user123",
  },
  {
    name: "Play Kitchen Set",
    info: "Mini kitchen set for imaginative play.",
    category: "Playsets",
    img_url: "https://example.com/play_kitchen_set.jpg",
    price: 28.99,
    user_id: "user456",
  },
  {
    name: "Sticker Art Book",
    info: "Create beautiful sticker art with this book.",
    category: "Arts and Crafts",
    img_url: "https://example.com/sticker_art_book.jpg",
    price: 8.99,
    user_id: "user789",
  },
];

module.exports.toys = toys;

async function search() {
  let query = { category: "Dolls" };
  const toys = await Toy.find(query);
  console.log(toys);
}

module.exports.createToys = async function createToys() {
  try {
    const createdToys = [];
    const data = toys;
    for (const toyData of data) {
      const toy = new Toy(toyData);
      const savedToy = await toy.save();
      createdToys.push(savedToy);
    }
    console.log(" toys created:", createdToys);
  } catch (error) {
    console.error("Error creating toys:", error);
  }
};

module.exports.deleteAll = async function deleteAll() {
  const toys = await Toy.find({});
  logger.info("toys" + toys);
  // try {
  //   await Toy.deleteMany({});
  // } catch (error) {
  //   console.error("Error creating toys:", error);
  // }
};
