import { useState, useEffect } from 'react';
import "../assets/styles/RegistroVentas.css";
import axios from 'axios';

function RegistroVentas() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [productos, setProductos] = useState([]);  // Estado para almacenar los productos

    // Obtener la lista de productos desde el backend al cargar el componente
    useEffect(() => {
        axios.get(`${apiUrl}/api/producto/`)
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error obteniendo los productos:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const venta = {
            producto,  // ID del producto seleccionado
            cantidad,
            precio_unitario: precioUnitario,
        };

        try {
            const response = await axios.post('/api/ventas/', venta);
            console.log('Venta registrada:', response.data);
        } catch (error) {
            console.error('Error registrando la venta:', error);
        }
    };

    return (
        <div className="registro-ventas-container">
            <h2>Registrar Venta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Producto:</label>
                    <select
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(prod => (
                            <option key={prod.IdProducto} value={prod.IdProducto}>
                                {prod.NombreProducto}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Precio Unitario:</label>
                    <input
                        type="number"
                        value={precioUnitario}
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Registrar Venta</button>
            </form>
        </div>
    );
}

export default RegistroVentas;

