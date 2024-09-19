import "../assets/styles/ReporteVentas.css"
import CardReporte from "./CardReporte";
import { useEffect, useState } from "react";
import axios from 'axios';
import "../utils/logica"
import { obtenerMaximo } from "../utils/logica";

function ReporteVentas() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [asociacion, setAsociacion] = useState([]);
  const [topProduct, setTopProduct] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProductoFactura();
  }, []);

  const fetchProductoFactura = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/productofacturaconsulta/`);
      setAsociacion(response.data);
      const maximoVentas = obtenerMaximo(response.data)
      setTopProduct(maximoVentas.nombre);
      setTotal(maximoVentas.valor)
    } catch (error) {
      console.error('Error fetching productofactura:', error);
    }
  };

  return (
    <div className="contenedor-reporte-ventas">
      <h2>Ventas e ingresos</h2>
      <div className="contenedor-cabecero">
        <div className="contenedor-inicial">
          <p className="info-text">Producto mas vendido</p>
          <p className="info-value">{topProduct}</p>
        </div>
        <div className="contenedor-secundario">
          <p className="info-text">Numero de ventas</p>
          <p className="info-value">{asociacion.length}</p>
        </div>
        <div className="contenedor-final">
          <p className="info-text">Total</p>
          <p className="info-value">${total}</p>
        </div>
      </div>
        <div className="flex-container">
          <div className="flex-header">
            <div className="flex-item">Nombre</div>
            <div className="flex-item">Producto</div>
            <div className="flex-item">Cantidad</div>
            <div className="flex-item">Empleado</div>
            <div className="flex-item">Metodo de pago</div>
            <div className="flex-item">Banco</div>
            <div className="flex-item">Fecha</div>
            <div className="flex-item">Valor total</div>
          </div>
        {asociacion.map(element => (
          <div className="flex-row" key={element.IdProductoFactura}>
            <div className="flex-item"><h3>{element.IdFactura.IdCliente.NombreCliente}</h3></div>
            <div className="flex-item"><h3>{element.IdProducto.NombreProducto}</h3></div>
            <div className="flex-item"><h3>{element.Cantidad}</h3></div>
            <div className="flex-item"><h3>{element.IdFactura.IdEmpleado.NombreEmpleado}</h3></div>
            <div className="flex-item"><h3>{element.IdFactura.MedioPago}</h3></div>
            <div className="flex-item"><h3>{element.IdFactura.MedioPago !== 'Efectivo' ? element.IdFactura.IdBanco.NombreBanco : "N/A"}</h3></div>
            <div className="flex-item"><h3>{element.IdFactura.Fecha}</h3></div>
            <div className="flex-item"><h3>${element.Cantidad * element.IdProducto.ValorUnidad}</h3></div>
          </div>
        ))}
        </div>
    </div>
  );
}

export default ReporteVentas;