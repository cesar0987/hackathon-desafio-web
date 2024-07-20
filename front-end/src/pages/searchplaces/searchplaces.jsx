import React, { useState } from 'react';

const SearchPlaces = () => {
    const [query, setQuery] = useState('');
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    const searchPlaces = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/places/search-places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_JWT_TOKEN` // Reemplaza con tu token JWT
                },
                body: JSON.stringify({ textQuery: query })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPlaces(data.results || []);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Buscar Lugares</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar lugares"
            />
            <button onClick={searchPlaces}>Buscar</button>
            {error && <p>{error}</p>}
            <ul>
                {places.map((place) => (
                    <li key={place.place_id}>{place.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPlaces;
