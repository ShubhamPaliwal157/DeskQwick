import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ role: '', language: '' });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        setForm({ role: res.data.role || '', language: res.data.language || '' });
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/users/me', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setMessage('Profile updated successfully.');
    } catch (err) {
        console.error('Profile update failed:', err);
        setMessage('Failed to update profile.');
    }

  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>

      <form onSubmit={handleUpdate} style={{ maxWidth: 400 }}>
        <label>
          Role:
          <select name="role" value={form.role} onChange={handleChange} style={{ display: 'block', margin: '1rem 0' }}>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">Admin</option>
          </select>
        </label>

        <label>
          Language:
          <input
            type="text"
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="Preferred Language"
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />
        </label>

        <button type="submit">Update Profile</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
