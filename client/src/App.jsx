import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';
import ThemeProvider from './contexts/ThemeContext';
import useTheme from './contexts/useTheme';
import './App.css';

function AppRoutes() {
  const { darkMode } = useTheme();
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
