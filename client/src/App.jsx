import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/admin" element={<AdminLoginPage />} />
    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
  </Routes>
);

export default App;
