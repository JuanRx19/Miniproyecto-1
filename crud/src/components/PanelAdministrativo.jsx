import "../assets/styles/PanelAdministrativo.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

function PanelAdministrativo() {

  const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        fetchEmpleados();
        listarEmpleados();
    }, []);

    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/empleado/');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const listarEmpleados = async () => {
      console.log(empleados)
    };

  return (
    <div className="contenedor-administrativo">
      Panel Administrativo
      <h2>Lista de Empleados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(empleado => (
                        <tr key={empleado.IdEmpleado}>
                            <td>{empleado.NombreEmpleado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    
  );
}

export default PanelAdministrativo;