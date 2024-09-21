import { useState, useEffect } from 'react';
import "../assets/styles/RegistroVentas.css";
import axios from 'axios';

function RegistroVentas() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cliente, setCliente] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [medioPago, setMedioPago] = useState('');
    const [idBanco, setIdBanco] = useState('');
    const [productos, setProductos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [productosVenta, setProductosVenta] = useState([]); // Almacena los productos seleccionados
    const [mensajeExito, setMensajeExito] = useState('');

    // Bancos predefinidos
    const bancos = [
        { IdBanco: 1, NombreBanco: 'Bancolombia' },
        { IdBanco: 2, NombreBanco: 'Banco de Bogotá' },
        { IdBanco: 3, NombreBanco: 'BBVA' },
        { IdBanco: 4, NombreBanco: 'Otro' }
    ];

    const fechaActual = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        axios.get(`${apiUrl}/api/producto/`)
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error obteniendo los productos:', error);
            });

        axios.get(`${apiUrl}/api/empleado/`)
            .then(response => {
                setEmpleados(response.data);
            })
            .catch(error => {
                console.error('Error obteniendo los empleados:', error);
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

    const agregarProducto = () => {
        if (producto && cantidad && precioUnitario) {
            const nuevoProducto = {
                IdProducto: producto,
                Cantidad: cantidad,
                PrecioUnitario: precioUnitario
            };
            setProductosVenta([...productosVenta, nuevoProducto]);
            setProducto('');
            setCantidad('');
            setPrecioUnitario('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Factura generada con éxito");

        const venta = {
            Productos: productosVenta, // Lista de productos
            IdCliente: cliente,
            IdEmpleado: empleado,
            Fecha: fechaActual,
            MedioPago: medioPago,
            IdBanco: medioPago === 'Tarjeta' ? idBanco : null
        };

        try {
            const response = await axios.post(`${apiUrl}/api/ventas/`, venta);
            console.log('Venta registrada:', response.data);

            // Restablecer el formulario después de la venta
            setCliente('');
            setEmpleado('');
            setMedioPago('');
            setIdBanco('');
            setProductosVenta([]);
        } catch (error) {
            console.error('Error registrando la venta:', error);
        }
    };

    const total = productosVenta.reduce((acc, prod) => acc + (prod.Cantidad * prod.PrecioUnitario), 0);

    return (
        <div className="registro-ventas-container">
            <h2>Registrar Venta</h2>

            <p>Fecha Actual: {fechaActual}</p>

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
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                        readOnly
                    />
                </div>
                <button type="button" onClick={agregarProducto} className="add-product-button">
                    Agregar Producto
                </button>

                <h3>Productos en la factura:</h3>
                <ul>
                    {productosVenta.map((prod, index) => (
                        <li key={index}>
                            Producto: {prod.IdProducto}, Cantidad: {prod.Cantidad}, Precio Unitario: {prod.PrecioUnitario}
                        </li>
                    ))}
                </ul>

                <div className="form-group">
                    <label>ID Cliente:</label>
                    <input
                        type="text"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Empleado:</label>
                    <select
                        value={empleado}
                        onChange={(e) => setEmpleado(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un empleado</option>
                        {empleados.map(emp => (
                            <option key={emp.IdEmpleado} value={emp.IdEmpleado}>
                                {emp.NombreEmpleado}
                            </option>
                        ))}
                    </select>
                    {empleado && (
                        <span className="empleado-id">ID Empleado: {empleado}</span>
                    )}
                </div>
                <div className="form-group">
                    <label>Método de Pago:</label>
                    <select
                        value={medioPago}
                        onChange={(e) => setMedioPago(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un método de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                    </select>
                </div>
                {medioPago === 'Tarjeta' && (
                    <div className="form-group">
                        <label>Banco:</label>
                        <select
                            value={idBanco}
                            onChange={(e) => setIdBanco(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un banco</option>
                            {bancos.map(banco => (
                                <option key={banco.IdBanco} value={banco.IdBanco}>
                                    {banco.NombreBanco}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <p>Total: {total}</p>

                <button type="submit" className="submit-button">Registrar Venta</button>
            </form>
        </div>
    );
}

export default RegistroVentas;
