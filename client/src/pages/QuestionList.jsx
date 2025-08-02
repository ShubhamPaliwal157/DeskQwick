import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Questions</h2>
      <Link to="/ask"><button>Ask Question</button></Link>
      <div style={{ marginTop: '2rem' }}>
        {questions.map(q => (
          <div key={q._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>
              <Link to={`/questions/${q._id}`}>{q.title}</Link>
            </h3>
            <p>{q.description}</p>
            <p>Tags: {q.tags?.join(', ')}</p>
            <p>Votes: {q.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
