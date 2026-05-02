import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true , lowercase: true, trim: true },
    nicknames: [{ type: String, lowercase: true }], // Array of nicknames
    message: { type: String, required: true },
    whatTheyveBeenUpTo: { type: String, required: true },
});

export default mongoose.model('Friend', friendSchema);