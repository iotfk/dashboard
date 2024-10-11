import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { useNavigate, Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Machinedata from './pages/Machinedata';
import Machinemap from './pages/Machinemap';
import Reports from './pages/Reports';
import { MachineProvider } from './hooks/ContextAPI/MachineContext';
import Login from './pages/loginpage/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  return (
    <MachineProvider>
      <BrowserRouter>
        {isAuthenticated ? (
          <Sidebar>
            <Routes>
            {/* <Route path='/machinedata-hidden' element={<Machinedata style={{ display: 'none' }} />} /> */}
         
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/machinedata' element={<Machinedata />} />
              <Route path='/machinemap' element={<Machinemap />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/' element={<Navigate to="/dashboard" />} />
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </MachineProvider>
  );
}

export default App;
