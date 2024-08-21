import { useState, useEffect } from 'react';
import "../assets/styles/RegistroVentas.css";
import axios from 'axios';

function RegistroVentas() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [productos, setProductos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [medioPago, setMedioPago] = useState('Efectivo');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha actual por defecto
    const [nombreEmpleado, setNombreEmpleado] = useState(''); // Suponemos que el nombre del empleado está en algún estado
    const idVendedor = 1; // ID del vendedor (asumido que se conoce)
    
    useEffect(() => {
        axios.get(`${apiUrl}/api/producto/`)
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error obteniendo los productos:', error);
            });
    }, []);

    const handleProductoChange = (e) => {
        const productoSeleccionado = productos.find(prod => prod.IdProducto === parseInt(e.target.value));
        setProducto(e.target.value);
        if (productoSeleccionado) {
            setPrecioUnitario(productoSeleccionado.ValorUnidad);
        } else {
            setPrecioUnitario('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Primero, crear la factura
            const factura = {
                idCliente: cliente,
                idVendedor,
                fecha,
                medioPago,
                idBanco: medioPago === 'Transferencia' ? 1 : null // Se guarda como Transferencia
            };

            const responseFactura = await axios.post(`${apiUrl}/api/facturas/`, factura);
            const codigoFactura = responseFactura.data.CodigoFactura; // Obtener el CodigoFactura generado

            // Luego, crear la entrada en ProductoFactura
            const productoFactura = {
                idProducto: producto,
                idFactura: codigoFactura,
                cantidad
            };

            await axios.post(`${apiUrl}/api/productofactura/`, productoFactura);
            console.log('Venta registrada correctamente');
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
                        onChange={handleProductoChange}
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
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Cliente:</label>
                    <input
                        type="text"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nombre del Empleado:</label>
                    <input
                        type="text"
                        value={nombreEmpleado}
                        onChange={(e) => setNombreEmpleado(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Medio de Pago:</label>
                    <select
                        value={medioPago}
                        onChange={(e) => setMedioPago(e.target.value)}
                        required
                    >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Registrar Venta</button>
            </form>
        </div>
    );
}

export default RegistroVentas;

