import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { useUser } from '../../contexts/UserContext';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await login(email, password);
      
      
      loginUser(response.user, response.token);
      
      
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