import { useState, useEffect } from 'react';
import "../assets/styles/RegistroVentas.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import axios from 'axios';

function RegistroVentas() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [nombreProducto, setNombreProducto] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [maximo, setMaximo] = useState();
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cliente, setCliente] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [medioPago, setMedioPago] = useState('');
    const [idBanco, setIdBanco] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosVenta, setProductosVenta] = useState([]); // Almacenar múltiples productos
    const [empleados, setEmpleados] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [clienteData, setClienteData] = useState(0);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');

    const fechaActual = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        setLoading(true)
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
    
        axios.get(`${apiUrl}/api/banco/`)
            .then(response => {
                setBancos(response.data);
            })
            .catch(error => {
                console.error('Error obteniendo los bancos:', error);
            });
        setLoading(false)
    }, [apiUrl]);
    

    const handleProductoChange = (e) => {
        const productoSeleccionado = productos.find(prod => prod.IdProducto === parseInt(e.target.value));
        setProducto(e.target.value);
        if (productoSeleccionado) {
            setNombreProducto(productoSeleccionado.NombreProducto);
            setPrecioUnitario(productoSeleccionado.ValorUnidad);
            setMaximo(productoSeleccionado.Cantidad);
        } else {
            setPrecioUnitario('');
        }
    };

    const agregarProducto = () => {
        if (producto && cantidad && precioUnitario && cantidad <= maximo) {
            const nuevoProducto = {
                IdProducto: producto,
                Maximo: maximo,
                NombreProducto: nombreProducto,
                Cantidad: cantidad,
                PrecioUnitario: precioUnitario,
                Total: cantidad * precioUnitario // Calcular el total por producto
            };
            setProductosVenta([...productosVenta, nuevoProducto]);
            setProducto('');
            setCantidad('');
            setPrecioUnitario('');
            setMaximo(0);
        } else {
            alert("Verifica que hayas seleccionado un producto, una cantidad válida y que esté disponible en inventario.");
        }
    };

    const eliminarProducto = (index) => {
        const nuevosProductosVenta = productosVenta.filter((_, i) => i !== index);
        setProductosVenta(nuevosProductosVenta);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Crear nuevo cliente si no existe
            const nuevoCliente = {
                IdCliente: cliente,
                NombreCliente: nombre,
                DireccionCliente: direccion,
                Correo: correoElectronico
            };
    
            const venta = {
                IdCliente: cliente,
                IdEmpleado: empleado,
                Fecha: fechaActual,
                MedioPago: medioPago,
                IdBanco: medioPago === 'Tarjeta' || medioPago === 'Transferencia' ? idBanco : 4
            };
    
            // Verificar si el cliente existe
            if (!clienteData.NombreCliente) {
                await axios.post(`${apiUrl}/api/cliente/`, nuevoCliente);
                console.log("Cliente creado correctamente");
            } else {
                // Usar el correo electrónico existente
                setCorreoElectronico(clienteData.Correo);
            }
    
            // Registrar la venta
            const response = await axios.post(`${apiUrl}/api/factura/`, venta);
    
            // Iterar sobre productos y procesarlos
            for (const prodVenta of productosVenta) {
                try {
                    const productoFactura = {
                        IdFactura: response.data.IdFactura,
                        IdProducto: parseInt(prodVenta.IdProducto),
                        Cantidad: prodVenta.Cantidad
                    };
    
                    // Registrar producto en la factura
                    await axios.post(`${apiUrl}/api/productofactura/`, productoFactura);
    
                    const nuevaCantidad = prodVenta.Maximo - prodVenta.Cantidad;
    
                    // Actualizar cantidad de productos en inventario
                    await axios.patch(`${apiUrl}/api/producto/${prodVenta.IdProducto}/`, {
                        Cantidad: nuevaCantidad
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    // Enviar correo si el producto se ha agotado
                    if (nuevaCantidad < 1) {
                        try {
                            await axios.post(`${apiUrl}/api/enviar-email/`, {
                                destinatario: "juanrx1904@gmail.com",
                                asunto: "Inventario agotado",
                                email: `El producto ${prodVenta.NombreProducto} se ha agotado actualmente en el inventario.`,
                            });
                        } catch (error) {
                            console.error(`Error enviando correo de agotado para el producto ${prodVenta.NombreProducto}:`, error);
                            // Continuar incluso si falla el envío del correo de agotado
                        }
                    }
    
                } catch (error) {
                    console.error(`Error procesando el producto ${prodVenta.NombreProducto}:`, error);
                    // Continuar con el siguiente producto aunque haya un error
                    continue;
                }
            }
    
            // Crear cuerpo del correo con los productos vendidos
            const productosAgotados = productosVenta
                .map(prodVenta => `- ${prodVenta.NombreProducto}: Cantidad: ${prodVenta.Cantidad}, Precio Unitario: ${prodVenta.PrecioUnitario}, Total: ${prodVenta.Total}`)
                .join('\n');
    
            const cuerpo = `Estimado cliente,\n\nSe ha registrado una nueva venta en nuestro sistema. A continuación, se detalla la información de los productos vendidos:\n\n${productosAgotados}\n\nGracias por su compra.\n\nSaludos cordiales,\nSuperMercado XYZ.`;
            // Enviar correo de confirmación de venta al cliente
            try {
                const responseCorreo = await axios.post(`${apiUrl}/api/enviar-email/`, {
                    destinatario: clienteData.Correo,
                    asunto: "Factura de venta",
                    email: cuerpo,
                });
                console.log("Correo de factura enviado:", responseCorreo);
            } catch (e) {
                console.error("Error enviando el correo de factura:", e);
            }
    
            console.log('Venta registrada:', response.data);
    
            // Restablecer el formulario después de la venta
            setCliente('');
            setEmpleado('');
            setMedioPago('');
            setIdBanco('');
            setMaximo(null);
            setClienteData(0);
            setNombreProducto('');
            setProductosVenta([]); // Vaciar la lista de productos
    
        } catch (error) {
            console.error('Error registrando la venta:', error);
        } finally {
            setLoading(false); // Ocultar el indicador de carga
        }
    };

    const buscarCliente = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${apiUrl}/api/cliente/${cliente}/`);
            setClienteData(response.data);
        } catch (error) {
            setClienteData([]);
            console.error('Cliente no encontrado:', error);
        }
    };

    function renderizarFormulario() {
        if (clienteData !== 0) {
            return (
                <>
                    <Loader loading={loading} />
                    {clienteData.NombreCliente ? 
                        <h3>{clienteData.NombreCliente}</h3> : 
                        <>
                            <div className="form-group">
                                <h3>Cliente no encontrado</h3>
                                <label>Nombre del cliente:</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <label>Dirección del cliente:</label>
                                <input
                                    type="text"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
                                />
                                <label>Correo electronico:</label>
                                <input
                                    type="email"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    }
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
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>
                    {(medioPago === 'Tarjeta' || medioPago === 'Transferencia') && (
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
                    
                    <p>Total: {productosVenta.reduce((acc, prod) => acc + prod.Total, 0)}</p>
                    
                    <button type="submit" className="submit-button">Registrar Venta</button>
                </>
            );
        }
    }

    return (
        <div className="registro-ventas-container">
            <Loader loading={loading} />
            <h2>Registrar Venta</h2>
            <p>Fecha Actual: {fechaActual}</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Producto:</label>
                    <select
                        value={producto}
                        onChange={handleProductoChange}
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.filter(prod => prod.Cantidad > 0).map(prod => (
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
                        onChange={(e) => {
                            const valor = parseInt(e.target.value, 10);

                            // Validar que la cantidad no exceda el máximo disponible y no sea negativa
                            if (!isNaN(valor) && valor > 0 && valor <= maximo) {
                                setCantidad(valor);
                            } else if (valor > maximo) {
                                alert(`La cantidad máxima disponible es ${maximo}`);
                            }
                        }}
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
                <button className="agregar-producto" type="button" onClick={agregarProducto}>Agregar Producto</button>

                <h3>Productos seleccionados</h3>
                <ul className='productos-ul'>
                    {productosVenta.map((prod, index) => (
                        <li key={index}>
                            x{prod.Cantidad} {prod.NombreProducto} - Precio: {prod.PrecioUnitario} - Total: {prod.Total}
                            <button className type="button" onClick={() => eliminarProducto(index)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </li>
                    ))}
                </ul>

                <h4>Total de la factura: {productosVenta.reduce((acc, prod) => acc + prod.Total, 0)}</h4>

                <div className="form-group">
                    <label>Cédula del cliente:</label>
                    <input
                        type="text"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                    />
                </div>
                <button onClick={buscarCliente} className="boton-buscar">Buscar cliente</button>
                {renderizarFormulario()}
            </form>
        </div>
    );
}

export default RegistroVentas;
