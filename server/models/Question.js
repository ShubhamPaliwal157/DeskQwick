import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    tags: [String],
    votes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    answers: [{
        text: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }]
});

export default mongoose.model('Question', questionSchema);
