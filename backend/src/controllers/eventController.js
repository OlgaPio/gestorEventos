const Event = require('../models/Event');

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  const { name, date, time, location, description } = req.body;

  // Validación de campos requeridos
  if (!name || !date || !time || !location) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
  }

  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      description,
    });
    await newEvent.save(); // Guarda el evento en la base de datos
    res.status(201).json({ message: 'Evento creado con éxito', event: newEvent });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento: ' + error.message });
  }
};


// Obtener todos los eventos con filtro opcional por fecha y ubicación
exports.getAllEvents = async (req, res) => {
  try {
    const { date, location } = req.query;
    let filter = {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1); // Agregar un día para incluir todos los eventos del día

      filter.date = { $gte: startDate, $lt: endDate }; // Filtra eventos dentro del mismo día
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos: ' + error.message });
  }
};


// Obtener un evento por ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento: ' + error.message });
  }
};

// Actualizar un evento
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Evitar actualizaciones vacías
  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento actualizado con éxito', event: updatedEvent });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el evento: ' + error.message });
  }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento: ' + error.message });
  }
};
