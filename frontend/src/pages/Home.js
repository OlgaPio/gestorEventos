import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import AuthForm from '../components/AuthForm';
import { Alert, Snackbar } from '@mui/material'; 
import '../styles/home.css';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleAuth = async (email, password) => {
    try {
      const response = isLogin
        ? await login(email, password)
        : await register(email, password);

      if (!isLogin) {
        setSuccessMessage('Usuario registrado exitosamente'); 
        setIsLogin(true); 
      } else {
        authLogin(response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(isLogin ? 'Credenciales incorrectas' : 'Error al registrarse');
    }
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Bienvenido al Gestor de Eventos</h1>
        <p>Organiza y gestiona tus eventos de manera eficiente.</p>
      </div>
      <div className="auth-section">
        <AuthForm
          isLogin={isLogin}
          onSubmit={handleAuth}
          error={error}
          toggleForm={() => setIsLogin(!isLogin)}
        />
      </div>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      
      <Footer />
    </div>
  );
};

export default Home;