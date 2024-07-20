import  { useEffect, useState } from 'react';

const Categorias = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
            `http://localhost:8001/api/maps/search-places`,
            {
              method: 'POST',
              headers: {
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
              },
              body: JSON.stringify({
                textQuery: 'Restausante, Encarnacion, Paraguay',
              }),
            }
          );
  
          if (!response.ok) {
            throw new Error('la api no responde correctamente');
          }
    
          const data = await response.json();
          setPlaces(data.results || []);
          console.log(places);
          
        } catch (error) {
          setError(error.message);
          console.error('Error fetching data:', error.message);
        }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>CATEGORIAS</h1>
      {error && <p>Error: {error}</p>}
      {places.length > 0 ? (
        places.map((place, index) => (
          <p key={index}>
            {place.displayName.text}</p>  
        ))
      ) : (
        <p>Lugar no encontrado</p>
      )}
    </div>
  );
};

export default Categorias;
