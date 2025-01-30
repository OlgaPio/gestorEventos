import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { createEvent, updateEvent, getEventById } from '../services/api'; 

const EventForm = () => {
  const { eventId } = useParams(); 
  const navigate = useNavigate(); 
  const [event, setEvent] = useState(null); 
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener el evento solo cuando eventId esté presente
  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await getEventById(eventId); 
          setEvent(response.data);
        } catch (error) {
          console.error('Error al obtener el evento:', error);
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  // Si el evento está disponible, actualizar los campos del formulario
  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setDescription(event.description);
    }
  }, [event]);

  // Si no hay evento cargado y se está editando, mostrar un mensaje de carga
  if (eventId && !event) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, date, time, location, description };

    try {
      if (event) {
        await updateEvent(event._id, eventData); 
        setSuccessMessage('Evento actualizado exitosamente');
      } else {
        await createEvent(eventData);
        setSuccessMessage('Evento creado exitosamente');
      }
      setErrorMessage('');

      // Mostrar el mensaje de éxito
      setTimeout(() => {
        // Redirigir al dashboard después de 2 segundos de mostrar el mensaje
        navigate('/dashboard');
      }, 2000); // 2000 ms = 2 segundos de espera
    } catch (err) {
      setErrorMessage('Error al guardar el evento');
      console.error('Error al guardar el evento:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {event ? 'Editar Evento' : 'Crear Evento'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Evento"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Hora"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          {event ? 'Actualizar Evento' : 'Crear Evento'}
        </Button>
      </form>

      {/* Mensaje de éxito */}
      {successMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {/* Mensaje de error */}
      {errorMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
          <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EventForm;
