import "../assets/styles/ReporteVentas.css"
import { useEffect, useState } from "react";
import axios from 'axios';

function ReporteVentas() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [asociacion, setAsociacion] = useState([]);

  useEffect(() => {
    fetchProductoFactura();
  }, []);

  const fetchProductoFactura = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/productofacturaconsulta/`);
      setAsociacion(response.data);
    } catch (error) {
      console.error('Error fetching productofactura:', error);
    }
  };
  return (
    <div className="contenedor-reporte-ventas">
      <h1></h1>
      {
        asociacion.map(element => (
          <div className="element" key={element.IdProductoFactura}>
            <h3>{element.IdFactura.IdCliente.NombreCliente}</h3>
            <h3>{element.IdProducto.NombreProducto}</h3>
            <h3>{element.Cantidad}</h3>
          </div>
        ))
      }
    </div>
  );
}

export default ReporteVentas;