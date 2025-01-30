import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/EventCard.css';

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/event-form/${event._id}`);
  };

  const eventDate = new Date(event.date);

  return (
    <Card className="event-card">
      <CardContent className="event-card-content">
        <Typography variant="h5" className="event-title">{event.name}</Typography>
        <Typography className="event-text">{event.description}</Typography>
        <Typography className="event-text">{eventDate.toLocaleDateString()}</Typography>
        <Typography className="event-text">{event.time}</Typography>
        <Typography className="event-text">{event.location}</Typography>

        <div className="event-actions">
          <Button onClick={handleEdit} color="primary" startIcon={<EditIcon />}>
            Editar
          </Button>
          <Button onClick={() => onDelete(event._id)} color="error" startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
