// src/pages/QuestionList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './QuestionList.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(true);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('comments');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/questions')
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = questions
    .filter((q) => !showOpenOnly || q.status === 'open')
    .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
    .filter((q) => !category || q.tags.includes(category))
    .filter((q) => !status || q.status === status)
    .sort((a, b) =>
      sortBy === 'upvotes'
        ? b.votes - a.votes
        : b.answers.length - a.answers.length
    );

  return (
    <div className="question-list">
      <div className="filter-bar">
        <label>
          <input
            type="checkbox"
            checked={showOpenOnly}
            onChange={() => setShowOpenOnly(!showOpenOnly)}
          />
          Show open only
        </label>

        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">Categories</option>
          <option value="Technical">Technical</option>
          <option value="AI">AI</option>
        </select>

        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="comments">Most comment</option>
          <option value="upvotes">Most upvote</option>
        </select>

        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/ask" className="ask-button">
          Ask
        </Link>
      </div>

      {filtered.map((q) => (
        <div key={q._id} className="question-box">
          <div className="question-header">
            <div className="tags">
              {q.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <span className={`status-label ${q.status}`}>{q.status}</span>
          </div>

          <Link to={`/questions/${q._id}`} className="question-title">
            {q.title}
          </Link>
          <p className="posted-by">
            Posted by {q.user?.username || 'Anonymous'}
          </p>

          <div className="question-meta">
            <div className="vote-box">
              <button>▲</button>
              <span>{q.votes}</span>
              <button>▼</button>
            </div>
            <span className="answer-count">💬 {q.answers.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
