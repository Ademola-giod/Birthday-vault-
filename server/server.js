import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import Friend from './models/Friend.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// middleware
app.use(cors({
  origin: "https://birthday-vault-sigma.vercel.app", // Your live frontend URL
  methods: ["GET", "POST"],
  credentials: true
}
));
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from the Birthday webapp server!');
});



// 1. Route to add a friend's message (You'll use this to set up your data)
app.post('/friends', async (req, res) => {
  try {
    const newFriend = new Friend(req.body);
    await newFriend.save();
    res.status(201).json({ msg: "Friend added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Route for your friends to find their message
app.get('/friends/:name', async (req, res) => {
  try {
    const inputName = req.params.name.toLowerCase();
    
    // Look for the name OR a match in the nicknames array
    const friend = await Friend.findOne({
      $or: [
        { name: inputName },
        { nicknames: { $in: [inputName] } }
      ]
    });

    // If no match is found, send the "Generic/Inspirational" message
    if (!friend) {
      return res.json({
        name: "Friend",
        message: "I might not have a specific secret message for you yet, but I'm so glad you're here celebrating with me! Your support means the world.",
        whatTheyveBeenUpTo: "Being a great person and making this day special just by checking in!"
      });
    }

    // If a match IS found, send their specific data
    res.json(friend);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


//  this only runs when working on my computer 
if(process.env.NODE_ENV !== "production"){
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
}

export default app;

