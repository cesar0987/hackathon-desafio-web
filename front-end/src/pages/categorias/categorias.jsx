    import React, { useEffect, useState } from 'react';
    const categorias = () => {
        const [places, setPlaces] = useState([]);
        // implementar api de google
        URL = `https://places.googleapis.com/v1/places:searchText`
        useEffect(() => {
            const fetchPlaces = async () => {
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-api-key': 'AIzaSyAt3oTHy0DfMpfp4aED_V5_Lj9SQKerUbE',
                        'X-Goog-fieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
                    }

                    });
                return response.json();

                const data = await response.json();
                setPlaces(data);
            };
            fetchPlaces();

            console.log(places);

        }, []);
        return(
            <div>
                <h1>CATEGORIAS</h1>
                {places.map(places => <p>{places.displayName}</p>)}
            </div>
        )
    };
    export default categorias;