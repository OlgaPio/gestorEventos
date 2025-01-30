import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    try {
      const response = await register(email, password);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrarse');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <AuthForm isLogin={false} onSubmit={handleRegister} error={error} />
    </div>
  );
};

export default Register;