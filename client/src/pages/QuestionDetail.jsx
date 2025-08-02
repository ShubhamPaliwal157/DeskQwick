import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/${id}`);
      setQuestion(res.data);
    } catch (err) {
      console.error('Error fetching question:', err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        `http://localhost:5000/api/questions/${id}/answer`,
        { text: answerText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswerText('');
      fetchQuestion(); // Refresh the view
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post answer');
    }
  };

  const vote = async (delta) => {
    try {
      await axios.post(
        `http://localhost:5000/api/questions/${id}/vote`,
        { delta }
      );
      fetchQuestion();
    } catch (err) {
      console.error('Voting failed:', err);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <p>Tags: {question.tags.join(', ')}</p>
      <p>Votes: {question.votes}</p>
      <button onClick={() => vote(1)}>Upvote</button>
      <button onClick={() => vote(-1)}>Downvote</button>

      <h3>Answers</h3>
      {question.answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        question.answers.map((a, i) => (
          <div key={i} style={{ borderTop: '1px solid #ccc', marginTop: '1rem', paddingTop: '1rem' }}>
            <p>{a.text}</p>
            <p><strong>By:</strong> {a.author?.username || 'Anonymous'}</p>
          </div>
        ))
      )}

      <form onSubmit={submitAnswer} style={{ marginTop: '2rem' }}>
        <textarea
          placeholder="Your answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          required
          style={{ width: '100%', height: '100px' }}
        />
        <button type="submit">Post Answer</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default QuestionDetail;
