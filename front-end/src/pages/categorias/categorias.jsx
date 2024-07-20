import React, { useEffect, useState } from 'react';

const Categorias = () => {
    const [places, setPlaces] = useState([]);
    const API_KEY = 'AIzaSyAt3oTHy0DfMpfp4aED_V5_Lj9SQKerUbE';
    const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Bancos+en+Encarnacion,+Paraguay&key=${API_KEY}`;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPlaces(data.results);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchPlaces();
    }, [URL]);

    return (
        <div>
            <h1>CATEGORIAS</h1>
            {places.length > 0 ? (
                places.map((place) => (
                    <p key={place.place_id}>{place.name}</p>
                ))
            ) : (
                <p>No se encontraron lugares.</p>
            )}
        </div>
    );
};

export default Categorias;
