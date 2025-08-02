import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.log(err));
