import { Link } from "react-router-dom"; // Assuming you're using React Router
import "./dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/category/categorylist"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Verify the received data

        if (Array.isArray(data)) {
          setPlaces(data); // Set state with data
          console.log("Places set:", data);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Adjust according to your storage mechanism
    navigate("/"); // Change to your desired route
  };

  return (
    <>
      <header className="header">
        <h1>Turismo</h1>
        <h2>Categoria</h2>
        <nav className="contentNav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <section>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {places.map(({ _id, nombre, imagen }) => (
            <li key={_id}>
              <h3>{nombre}</h3>
              <img
                src={imagen}
                alt={nombre}
                style={{ width: "100px", height: "auto" }}
              />
              <Link to={`/categoria/${nombre}}`}>Ver más</Link>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
