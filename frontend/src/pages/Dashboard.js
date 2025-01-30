import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent, createEvent, updateEvent } from '../services/api';
import EventCard from '../components/EventCard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button, TextField, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add, Edit, Delete, Logout } from '@mui/icons-material'; 
import '../styles/dashboard.css';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false); 
  const [eventToDelete, setEventToDelete] = useState(null); 
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEvents(filters);
      setEvents(response.data);
    } catch (err) {
      console.error('Error al obtener eventos:', err);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async () => {
    try {
      await deleteEvent(eventToDelete._id); 
      setSuccessMessage('Evento eliminado exitosamente');
      setOpenDeleteConfirmDialog(false); 
      fetchEvents();
    } catch (err) {
      console.error('Error al eliminar evento:', err);
    }
  };

  const handleCreateOrUpdateEvent = async (eventData) => {
    try {
      if (isEditing) {
        await updateEvent(currentEvent._id, eventData);
        setSuccessMessage('Evento actualizado exitosamente');
      } else {
        await createEvent(eventData);
        setSuccessMessage('Evento creado exitosamente');
      }
      setIsEditing(false);
      setCurrentEvent(null);
      setOpenDialog(false);
      fetchEvents();
    } catch (err) {
      console.error('Error al guardar el evento:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenDialog = (event = null) => {
    setCurrentEvent(event);
    setIsEditing(!!event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEvent(null);
  };

  // Manejo de confirmación de eliminación
  const handleOpenDeleteConfirmDialog = (event) => {
    setEventToDelete(event); 
    setOpenDeleteConfirmDialog(true);
  };

  const handleCloseDeleteConfirmDialog = () => {
    setOpenDeleteConfirmDialog(false);
    setEventToDelete(null); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dashboard-container">
        <h1>Dashboard de Eventos</h1>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Logout />}
          onClick={handleLogout}
          className="logout-button"
        >
          Cerrar Sesión
        </Button>
        <div className="filters">
          <DatePicker
            label="Filtrar por fecha"
            value={filters.date ? dayjs(filters.date) : null}
            onChange={(date) => setFilters({ ...filters, date: date ? date.toDate() : null })}
          />
          <TextField
            label="Filtrar por ubicación"
            value={filters.location || ''}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
        <div className="add-event-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            className="add-event-button"
          >
            Agregar Evento
          </Button>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={() => handleOpenDeleteConfirmDialog(event)} 
              onEdit={() => handleOpenDialog(event)}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={() => handleOpenDialog(event)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleOpenDeleteConfirmDialog(event)} 
              >
                Eliminar
              </Button>
            </EventCard>
          ))}
        </div>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>

        {/* Dialog para crear o editar evento */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isEditing ? 'Editar Evento' : 'Crear Evento'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre del evento"
              fullWidth
              value={currentEvent?.name || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
            />
            <TextField
              label="Ubicación"
              fullWidth
              value={currentEvent?.location || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
            />
            <DatePicker
              label="Fecha del evento"
              value={currentEvent?.date ? dayjs(currentEvent.date) : null}
              onChange={(date) => setCurrentEvent({ ...currentEvent, date: date ? date.toDate() : null })}
              fullWidth
            />
            <TextField
              label="Hora"
              type="time"
              fullWidth
              value={currentEvent?.time || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              value={currentEvent?.description || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={() => handleCreateOrUpdateEvent(currentEvent)}
              color="primary"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de confirmación de eliminación */}
        <Dialog open={openDeleteConfirmDialog} onClose={handleCloseDeleteConfirmDialog}>
          <DialogTitle>¿Estás seguro de eliminar este evento?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer />
    </LocalizationProvider>
  );
};

export default Dashboard;
