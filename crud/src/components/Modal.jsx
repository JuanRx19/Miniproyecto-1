import '../assets/styles/Modal.css';
import { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, isEdit, data, fetchEmpleados }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!isOpen) return null; // No renderiza el modal si no está abierto
  const [nombre, setNombre] = useState();
  const [usuario, setUsuario] = useState();
  const [contraseña, setContraseña] = useState();
  const [tipo, setTipo] = useState(false);

  const manejarFormulario = async () => {
    event.preventDefault();
    try{
      if(isEdit){
        await axios.post(`${apiUrl}/api/empleado/`, {
          NombreEmpleado: nombre,
          TipoEmpleado: tipo,
          Usuario: usuario,
          Contraseña: contraseña,
        });
        alert('Empleado agregado con éxito');
      }else{
        await axios.put(`${apiUrl}/api/empleado/${data.IdEmpleado}/`, {
          NombreEmpleado: data.NombreEmpleado,
          TipoEmpleado: tipo,
          Usuario: usuario,
          Contraseña: contraseña,
        },{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert('Empleado actualizado con éxito');
        }
      } catch (error) {
        console.error('Error adding/edit employee:', error);
        alert('Hubo un error al agregar/editar el empleado');
      }
    fetchEmpleados();
    setNombre('');
    setTipo(false);
    setUsuario('');
    setContraseña('');
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{isEdit ? 'Agregar empleado' : 'Editar empleado'}</h2>
        <form onSubmit={manejarFormulario} className='modal-formulario'>
          <label>
            {isEdit ?  
            <>
              <p>Nombre:</p>
              <input
                type="text"
                name="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </>
            : <><p>Nombre:</p> {data.NombreEmpleado}</>
            }
          </label>
          <label>
            <p>Usuario:</p>
            <input
              type="text"
              name="name"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </label>

          <label>
           <p>Contraseña:</p>
            <input
              type="password"
              name="name"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </label>
          <label>¿Administrador?
          <input 
            type="checkbox" 
            checked={tipo} 
            onChange={(e) => setTipo(e.target.checked)} 
          />
          </label>
          <button type='submit'>{isEdit ? 'Guardar' : 'Editar'}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
