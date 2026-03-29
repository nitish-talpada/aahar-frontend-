import { Routes, Route, Navigate } from 'react-router-dom';
import ManagerLogin from './pages/ManagerLogin';
import ManagerLayout from './layout/ManagerLayout';
import LiveAttendance from './pages/LiveAttendance';
import WasteAnalytics from './pages/WasteAnalytics';

const ManagerApp = () => {
  return (
    <Routes>
      <Route path="login" element={<ManagerLogin />} />
      
      {/* Protected Routes (mocked protection by just sitting in a layout) */}
      <Route path="/" element={<ManagerLayout />}>
        <Route index element={<Navigate to="attendance" replace />} />
        <Route path="attendance" element={<LiveAttendance />} />
        <Route path="analytics" element={<WasteAnalytics />} />
      </Route>
    </Routes>
  );
};

export default ManagerApp;
