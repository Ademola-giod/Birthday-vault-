import mongoose from 'mongoose';
import 'dotenv/config';
import Friend from './models/Friend.js';

const friendsData = [
  {
    name: "Seyi",
    nicknames: ["ade", "demmy", "bros"],
    message: "You've been my day one. Thanks for always having my back!",
    whatTheyveBeenUpTo: "You've had a massive year—finishing that project and leveling up. Proud of you!"
  },
  {
    name: "Tobi",
    nicknames: ["toby", "t-bag"],
    message: "The energy you bring is unmatched! Happy Birthday!",
    whatTheyveBeenUpTo: "Seeing you start that new business and stay consistent has been inspiring."
  },
  {
    name: "Blessing",
    nicknames: ["bless", "b"],
    message: "You're a rare gem. Stay as kind as you are.",
    whatTheyveBeenUpTo: "Mastering your craft and finally moving into your own space. Huge wins!"
  },
  {
    name: "David",
    nicknames: ["shey", "sey"],
    message: "To the realest guy I know. Cheers to another year!",
    whatTheyveBeenUpTo: "Crushing those fitness goals and staying focused on the vision."
  }
];

const seedDatabase = async () => {
  try {
    // 1. Connect to your Cluster0
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // 2. Clear existing friends (prevents "Duplicate Key" errors if you run this twice)
    await Friend.deleteMany({});
    console.log("Old data cleared.");

    // 3. Insert the new list
    await Friend.insertMany(friendsData);
    console.log(`Success! ${friendsData.length} friends added to the vault.`);

    // 4. Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding the data:", err);
    process.exit(1);
  }
};

seedDatabase();