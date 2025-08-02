import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/questions', {
        title: form.title,
        description: form.description,
        tags: form.tags.split(',').map(tag => tag.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post question');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%', height: '100px' }}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <button type="submit">Post Question</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AskQuestion;
