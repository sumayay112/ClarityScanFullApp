import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import TakePhoto from './components/TakePhoto';
import Prediction from './components/Prediction';
import SkinTone from './components/SkinTone';
import Navbar from './components/Navbar';
import EditProfile from './components/EditProfile';
import LogOut from './components/LogOut';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      
      <Navbar />

  

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/take-photo" element={<TakePhoto />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/skin-tone" element={<SkinTone />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;