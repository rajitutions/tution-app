import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import About from './pages/About';
import SearchTutor from './pages/SearchTutor';
import RegisterTutor from './pages/RegisterTutor';
import TutorProfile from './pages/TutorProfile'; // ✅ Import TutorProfile

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search-tutor" element={<SearchTutor />} />
        <Route path="/register-tutor" element={<RegisterTutor />} />
        <Route path="/tutor/:id" element={<TutorProfile />} /> {/* ✅ Add Tutor Profile Route */}
      </Routes>
    </Router>
  );
};
export default App;
