import { Link } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categorias from "../categorias/categorias";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imgUrls = {
    hotel: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Aiar9nMKLooPhK0BPsefY0RU7joMlBxBrg&spg',
    bank: 'https://w7.pngwing.com/pngs/553/89/png-transparent-computer-icons-bank-bank.png',
    atraccion: 'https://w7.pngwing.com/pngs/178/478/png-transparent-multicolored-amusement-park-illustration-winnie-the-pooh-the-walt-disney-company-animation-cartoon-amusement-park-template-child-photography-thumbnail.png',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/category/categorylist");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setPlaces(data);
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
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const getImageUrl = (nombre) => {
    switch (nombre.toLowerCase()) {
      case 'hotel':
        return imgUrls.hotel;
      case 'bank':
        return imgUrls.bank;
      case 'atraccion':
        return imgUrls.atraccion;
      default:
        return 'https://via.placeholder.com/100'; // Imagen por defecto
    }
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
              <button onClick={handleLogout}>Logout</button>
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
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </section>
      <Categorias />
    </>
     
  );
};
