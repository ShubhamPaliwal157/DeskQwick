import express from 'express';
import Question from '../models/Question.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    const questions = await Question.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(questions);
});

// Ask question
router.post('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const question = new Question({ ...req.body, user: decoded.id });
    await question.save();
    res.status(201).json(question);
});

// Get specific question
router.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id).populate('user', 'username').populate('answers.author', 'username');
    res.json(question);
});

// Answer a question
router.post('/:id/answer', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const question = await Question.findById(req.params.id);
    question.answers.push({ text: req.body.text, author: decoded.id });
    await question.save();
    res.json(question);
});

// Vote
router.post('/:id/vote', async (req, res) => {
    const { delta } = req.body; // +1 or -1
    const question = await Question.findById(req.params.id);
    question.votes += delta;
    await question.save();
    res.json({ votes: question.votes });
});

export default router;
