import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styles
import logo from './logo.jpeg'; // Import the image

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    if (username === 'admin' && password === 'password') {
      console.log('Login successful');
      localStorage.setItem('isAuthenticated', 'true');
    //   navigate('/machinedata-hidden');
      window.location.reload(); 
    } else {
      //console.log('Invalid credentials');
      alert('Invalid Username or password !');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo-image" /> {/* Added logo */}
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign in to dashboard</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="login-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
