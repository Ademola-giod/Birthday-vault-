import mongoose from 'mongoose';
import 'dotenv/config';
import Friend from './models/Friend.js';

const friendsData = [
  {
    name: "Gbolahan",
    nicknames: ["GB", "godwin", "bro"],
    message: "Hi bro GB😎 Thanks for your care, your words of encouragement, advice, the laughters, gist and many more. you've been a lovely brother and an amazing one. Thank God for your christ driven life that helped me. May God continue to empower you and guide you BRO. HAPPY BIRTHDAY TO ME🎉🎇🎈  !!",
    whatTheyveBeenUpTo: "You've had a massive year—Chasing your dreams and leveling up. keep it up... Proud of you BRUHHHHH!!!"
  },
  {
    name: "Oluwatosin",
    nicknames: ["tosin", "glory"],
    message: "hey😍 sister Tosin, My lovely sister. super proud of who you are becoming and i am so grateful for a siter like you , we had a lot when we were younger and yes, i love those moments, i miss you big, miss your food ( oh yes, the peppered spaghetti, noodles, all kinds ). i pray the lord upholds you in every step you take, every decisions you make and may he bless you abundantly. HAPPY BIRTHDAY TO ME!!! .........say hello to my beautiful neice FUNMILAYO for me and give her a big hug from me. I LOVE YOU SISTER💖",

    whatTheyveBeenUpTo: "You've had a massive year—Chasing your dreams and leveling up. keep it up... Proud of you !!😊."
  },
  {
    name: "Blessing",
    nicknames: ["mom", "mummy", "Adebimpe"],
    message: "hello mummy!😎🤗🥰, it is your boy. i love you mom. Thanks for you care, support, kindness, advice, smiles, beatings (i will put that even though it was rare), love, efforts and many more MOM. I won't forget the cool memories mom, the night talks and watching of movies together and the sweet words and advice that comes. I am going to make you super proud MOM, we all are MOM 🥰😊😙. I pray the lord God in his mercies keep you, I pray for God's provision, protection, good health, sound mind, long life, favour and blessings.  HAPPY BIRTHDAY TO ME!!! 🎈🎁🎉  i miss your food ooo 😂😒😍",
    whatTheyveBeenUpTo: "Watching you balance everything with such grace has been truly impressive. my LOVELY MOM 🎇🎉💖"
  },
  {
    name: "Idowu",
    nicknames: ["dad", "azeez", "baba soldier", "baba soja"],
    message: "To the realest Dad!! 😎 Thank you so much for your care , support, guidance, parenting and love. i am going to make you super proud DAD, we all are DAD. i won't forget the cool memories i had with you , the stories you tell in AGUNMERI's voice ( i hope i get that right), the orlando musics and Gospel music you play evey morning. I love you Dad.I pray the lord God in his mercies keep you, I pray for God's provision, protection, good health, sound mind, long life, favour and blessings.  HAPPY BIRTHDAY TO ME!!! 🎈🎁🎉",
    whatTheyveBeenUpTo: "My SUPER DAD 😎😎"
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