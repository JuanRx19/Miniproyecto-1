import "../assets/styles/Home.css";
import { useState, useEffect } from 'react';
import Inventario from "./Inventario";
import RegistroVentas from "./RegistroVentas";
import ReporteVentas from "./ReporteVentas";
import Inicio from "./Inicio";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [opcion, setOpcion] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(false);
  const userNombre = localStorage.getItem('userNombre');
  const userRole = localStorage.getItem('userRole'); // Asegúrate de que 'userRole' esté guardado como 'Administrador' o 'Empleado'

  useEffect(() => {
    if (!userRole || userRole === 'null') {
      navigate('/');
    }else{
      setNombre(userNombre)
    }
  }, [userRole, userNombre, navigate]);

  function Renderizado() {
    if (opcion == 0 || opcion == null) {
      return <Inicio />;
    } else if (opcion === 1) {
      return <RegistroVentas />;
    } else if (opcion === 2) {
      return <ReporteVentas />;
    } else {
      return <Inventario />;
    }
  }

  function RenderUsers(){
    return (
      <button 
        onClick={() => {
          setVisible(!isVisible); 
          localStorage.setItem('userNombre', null); 
          localStorage.setItem('userRole', null); 
          navigate('/'); // Redirigir al login
        }}
      >
        Sign Out
      </button>
    );
  }

  function User(){
    if(isVisible){
      return RenderUsers();
    } else {
      return null;
    }
  }

  return (
    <div className="contenedor-home">
      <nav className="navbar">
        <div className="contenedor-logout">
        <button onClick={() => setVisible(!isVisible)}>
          {userRole === 'true' ? 'Administrador' : 'Empleado'}
        </button>
        {User()}
        </div>
        <ul>
          <li onClick={() => setOpcion(0)}><button className={`button ${opcion === 0 ? 'active' : ''}`}>Inicio</button></li>
          <li onClick={() => setOpcion(1)}><button className={`button ${opcion === 1 ? 'active' : ''}`}>Registro de ventas</button></li>
          <li onClick={() => setOpcion(2)}><button className={`button ${opcion === 2 ? 'active' : ''}`}>Reporte de ventas</button></li>
          <li onClick={() => setOpcion(3)}><button className={`button ${opcion === 3 ? 'active' : ''}`}>Inventario</button></li>
        </ul>
        <h3>{nombre}</h3>
      </nav>
      {Renderizado()}
    </div>
  );
}

export default Home;
