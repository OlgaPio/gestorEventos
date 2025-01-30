const express = require('express');
const { 
  createEvent, 
  getAllEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rutas del CRUD
router.post('/', authMiddleware, createEvent); // Crear un evento
router.get('/', authMiddleware, getAllEvents); // Obtener todos los eventos
router.get('/:id', authMiddleware, getEventById); // Obtener un evento por ID
router.put('/:id', authMiddleware, updateEvent); // Actualizar un evento
router.delete('/:id', authMiddleware, deleteEvent); // Eliminar un evento

module.exports = router;
