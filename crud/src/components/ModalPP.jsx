import '../assets/styles/ModalPP.css';
import { useState } from 'react';
import axios from 'axios';

const ModalPP = ({ isOpen, onClose, isPP, dataProveedores, fetchProductos }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!isOpen) return null; // No renderiza el modal si no está abierto
  const [nombre, setNombre] = useState();
  const [proveedor, setProveedor] = useState();
  const [idProveedor, setIdProveedor] = useState(1);
  const [cantidad, setCantidad] = useState();
  const [direccion, setDireccion] = useState();
  const [valor, setValor] = useState();
  const [url, setUrl] = useState();

  const manejarFormulario = async (e) => {
    e.preventDefault();
    try{
      if(isPP){
        await axios.post(`${apiUrl}/api/producto/`, {
          NombreProducto: nombre,
          IdProveedor: idProveedor,
          Cantidad: cantidad,
          ValorUnidad: valor,
          UrlImagen: url
        });
        alert('Producto agregado con exito');
      }else{
        await axios.post(`${apiUrl}/api/proveedor/`, {
          NombreProveedor: proveedor,
          DireccionProveedor: direccion
        });
        alert('Proveedor agregado con exito');
      }
    } catch (error) {
      console.error('Error con la carga de producto/proveedor:', error);
      alert('Hubo un error con la carga de producto/proveedor');
    }
    fetchProductos();
    onClose();
  }

  return (
    <div className="modal-overlay-pp" onClick={onClose}>
      <div className="modal-content-pp" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn-pp" onClick={onClose}>&times;</span>
        <h2>{isPP ? 'Agregar producto' : 'Agregar proveedor'}</h2>
        <form onSubmit={manejarFormulario} className='modal-formulario-pp'>
          <label>
            {isPP ?  
            <>
              <p>Producto:</p>
              <input
                type="text"
                name="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </>
            : 
            <>
              <p>Proveedor:</p>
              <input
                type="text"
                name="name"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                required
              />
            </>
            }
          </label>

          <label>
          {isPP ?  
            <>
              <p>Proveedor:</p>
              <select
                name="proveedor"
                value={idProveedor}
                onChange={(e) => {
                  console.log('Selected ID:', e.target.value); // Verifica el valor seleccionado
                  setIdProveedor(e.target.value);
                }}
                required
              >
                {dataProveedores.map(option => {
                    return (
                        <option value={option.IdProveedor} key={option.IdProveedor}>
                            {option.NombreProveedor}
                        </option>
                    );
                })}
              </select>
            </>
            : null
            }
          </label>

          <label>
          {isPP ?  
            <>
              <p>Cantidad:</p>
              <input
                type="number"
                step={5}
                name="name"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </>
            : 
            <>
              <p>Direccion:</p>
              <input
                type="text"
                name="name"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </>
            }
          </label>

          <label>
          {isPP ?  
            <>
              <p>Valor unidad:</p>
              <input
                type="number"
                step={100}
                name="name"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </>
            : null
            }
          </label>

          <label>
          {isPP ?  
            <>
              <p>Url imagen:</p>
              <input
                type="url"
                name="name"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </>
            : null
            }
          </label>
          
          <button type='submit'>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalPP;
