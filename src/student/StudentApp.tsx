import { Routes, Route, Navigate } from 'react-router-dom';
import StudentAuth from './pages/StudentAuth';
import StudentLayout from './layout/StudentLayout';
import StudentDashboard from './pages/StudentDashboard';
import PersonalHistory from './pages/PersonalHistory';
import ProfileManagement from './pages/ProfileManagement';
import Leaderboard from './pages/Leaderboard';

const StudentApp = () => {
  return (
    <Routes>
      <Route path="login" element={<StudentAuth mode="login" />} />
      <Route path="signup" element={<StudentAuth mode="signup" />} />
      
      {/* Protected Mobile App Routes */}
      <Route element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="history" element={<PersonalHistory />} />
        <Route path="profile" element={<ProfileManagement />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default StudentApp;
