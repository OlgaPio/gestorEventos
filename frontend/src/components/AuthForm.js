import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const AuthForm = ({ isLogin, onSubmit, error, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </Button>
      <Typography className="auth-form-text">
        {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
        <Button onClick={toggleForm} color="secondary">
          {isLogin ? 'Regístrate' : 'Inicia Sesión'}
        </Button>
      </Typography>
    </form>
  );
};

export default AuthForm;