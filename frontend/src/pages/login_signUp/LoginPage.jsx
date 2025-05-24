import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { useUser } from '../../contexts/UserContext';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  
  // Use individual state variables instead of formData object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await login(email, password);
      
      // Store user data and token in context
      loginUser(response.user, response.token);
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      setError(error.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;