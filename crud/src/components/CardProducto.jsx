import "../assets/styles/CardProducto.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from 'axios';

function CardProducto(props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cantidad, setCantidad] = useState()

  const agregarProducto = async () => {
    try {
      await axios.patch(`${apiUrl}/api/producto/${props.id}/`, {
        Cantidad: parseInt(props.cantidad) + parseInt(cantidad)
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      props.fetchProducto()
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };

  const eliminarProducto = async () => {
    try {
      await axios.patch(`${apiUrl}/api/producto/${props.id}/`, {
        Cantidad: parseInt(props.cantidad) - parseInt(cantidad)
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      props.fetchProducto()
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };
  
  return (
    <div className="contenedor-card-product">
      <div className="informacion-card">
        <h5>{props.nombre}</h5>
        <h5>{props.cantidad}</h5>
      </div>
      <div className="contenedor-card-informacion">
        <img src={props.url} alt="imagen-producto" className="imagen-producto"/>
        <h4 style={{color:"#40AD55"}}>${props.precio}</h4>
        <h4 style={{color:"#a64921"}}>{props.proveedor}</h4>
        <div className="contenedor-crud-producto">

          <button className="boton-quitar" onClick={eliminarProducto}><FontAwesomeIcon icon={faMinus} /></button>
          <input type="number" min = "0" onChange={(e) => setCantidad(e.target.value)}/>
          <button className="boton-agregar" onClick={agregarProducto}><FontAwesomeIcon icon={faPlus} /></button>
          
        </div>
      </div>
      
    </div>
  );
}

export default CardProducto;
