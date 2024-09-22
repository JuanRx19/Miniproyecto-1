import "../assets/styles/PanelAdministrativo.css";
import { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import React from 'react';

function PanelAdministrativo() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [empleados, setEmpleados] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModal, setEditModal] = useState();
  const [dataTemp, setDataTemp] = useState();
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const addModal = () => setEditModal(true);
  const editModal = () => setEditModal(false);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  function editar(empleado) {
    setDataTemp(empleado)
    openModal();
    editModal();
  }

  function agregar() {
    openModal();
    addModal();
  }
  
  const fetchEmpleados = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/api/empleado/`);
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false)
    }
  };
  
  const eliminarEmpleado = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/empleado/${id}/`);
      alert("Empleado eliminado correctamente");
      // Actualizar el grid después de eliminar
      setEmpleados((prevEmpleados) => prevEmpleados.filter(empleado => empleado.IdEmpleado !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="contenedor-administrativo">
      <Loader loading={loading} />
      <h2>Lista de Empleados</h2>
      <div className="grid-container">
        <div className="grid-header">ID</div>
        <div className="grid-header">Nombre</div>
        <div className="grid-header">Usuario</div>
        <div className="grid-header">Tipo</div>
        <div className="grid-header"></div>
        {empleados.map(empleado => (
          <React.Fragment key={empleado.IdEmpleado}>
            <div className="grid-item" key={empleado.IdEmpleado}>{empleado.IdEmpleado}</div>
            <div className="grid-item">{empleado.NombreEmpleado}</div>
            <div className="grid-item">{empleado.Usuario}</div>
            <div className="grid-item">{empleado.TipoEmpleado === true ? 'Administrador' : 'Empleado'}</div>
            <div className="grid-item">
              <button onClick={() => eliminarEmpleado(empleado.IdEmpleado)}><FontAwesomeIcon icon={faTrashAlt} /></button>
              <button onClick={() => editar(empleado)} className="editar"><FontAwesomeIcon icon={faPen} /></button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <button onClick={() => agregar()}>Agregar empleado</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} isEdit={isEditModal} data={dataTemp} fetchEmpleados={fetchEmpleados}/>
    </div>
  );
}

export default PanelAdministrativo;
