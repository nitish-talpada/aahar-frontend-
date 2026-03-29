import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagerApp from './manager/ManagerApp';
import StudentApp from './student/StudentApp';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Global Ecosystem Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Manager Portal */}
        <Route path="/manager/*" element={<ManagerApp />} />
        
        {/* Student Portal */}
        <Route path="/student/*" element={<StudentApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
