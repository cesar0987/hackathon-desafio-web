import React, { useState } from 'react';
import './itinerario.css'; // Asegúrate de crear este archivo CSS para estilos

const Itinerario = () => {
  const [itineraries, setItineraries] = useState([]);
  const [newItinerary, setNewItinerary] = useState({ date: '', location: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItinerary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItineraries((prev) => [...prev, newItinerary]);
    setNewItinerary({ date: '', location: '', description: '' });
  };

  return (
    <div className="itinerary-container">
      <header className="itinerary-header">
        <h1>Itinerario</h1>
        <p>Planifica tu viaje con facilidad.</p>
      </header>

      <section className="itinerary-list">
        <h2>Itinerarios Programados</h2>
        <ul>
          {itineraries.map((item, index) => (
            <li key={index}>
              <h3>{item.date}</h3>
              <p><strong>Ubicación:</strong> {item.location}</p>
              <p><strong>Descripción:</strong> {item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="itinerary-form">
        <h2>Añadir Nuevo Itinerario</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Fecha:
            <input
              type="date"
              name="date"
              value={newItinerary.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ubicación:
            <input
              type="text"
              name="location"
              value={newItinerary.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={newItinerary.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Añadir Itinerario</button>
        </form>
      </section>
    </div>
  );
};

export default Itinerario;
