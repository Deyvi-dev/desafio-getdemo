import Dashboard from '@/pages/Dashboard';
import DemoPage from '@/pages/Demo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/demo/:demoId" element={<DemoPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
