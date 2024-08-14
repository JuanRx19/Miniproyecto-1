import "../assets/styles/Home.css";
import { useState } from 'react';
import Inventario from "./Inventario";
import RegistroVentas from "./RegistroVentas";
import ReporteVentas from "./ReporteVentas";
import Inicio from "./Inicio";

function Home() {
  const [opcion, setOpcion] = useState(null);
  const [isVisible, setVisible] = useState(false);

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
    <div className="contenedor-users">
      Sign Out
    </div>);
  }

  function User(){
    if(isVisible){
      return RenderUsers();
    }else{
      return;
    }
  }

  return (
    <div className="contenedor-home">
      <nav className="navbar">
        <button onClick={() => setVisible(!isVisible)}>Tipo de usuario</button>
        {User()}
        <ul>
          <li onClick={() => setOpcion(0)}><button className={`button ${opcion === 0 ? 'active' : ''}`}>Inicio</button></li>
          <li onClick={() => setOpcion(1)}><button className={`button ${opcion === 1 ? 'active' : ''}`}>Registro de ventas</button></li>
          <li onClick={() => setOpcion(2)}><button className={`button ${opcion === 2 ? 'active' : ''}`}>Reporte de ventas</button></li>
          <li onClick={() => setOpcion(3)}><button className={`button ${opcion === 3 ? 'active' : ''}`}>Inventario</button></li>
        </ul>
      </nav>
      {Renderizado()}
    </div>
  );
}

export default Home;