import { useEffect, useState } from "react";
import "../assets/styles/Inventario.css"
import axios from 'axios';
import CardProducto from "./CardProducto";
import ModalPP from "./ModalPP";

function Inventario() {

  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProducto, setEditProduct] = useState();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const addProducto = () => setEditProduct(true);
  const addProveedor = () => setEditProduct(false);

  useEffect(() => {
    fetchProveedores();
    fetchProductos();
  }, []);

  function fetchAll(){
    fetchProveedores();
    fetchProductos();
  }

  function agregarProducto() {
    openModal();
    addProducto();
    
  }

  function agregarProveedor() {
    openModal();
    addProveedor();
  }

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/proveedor/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/producto/');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  function relacionProveedor(id){
    const nombre = proveedores.find((prov) => prov.IdProveedor === id);
    return nombre.NombreProveedor;
  } 

  return (
    <div className="contenedor-inventario">
      <div className="contenedor-informacion">
        <div className="informacion-tienda">
          <h3>Numero de proveedores: {proveedores.length}</h3>
          <h3>Numero de productos: {productos.length}</h3>
        </div>
        <div className="contenedor-funcionalidades">
          <button className="boton-producto" onClick={() => agregarProducto()}>Agregar producto</button>
          <button className="boton-proveedor" onClick={() => agregarProveedor()}>Agregar proveedor</button>
        </div>
      </div>
      <div className="contenedor-productos">
        {
          productos.map(producto => (
            <CardProducto key={producto.IdProducto}
              nombre = {producto.NombreProducto}
              url = {producto.UrlImagen}
              cantidad = {producto.Cantidad}
              precio = {producto.ValorUnidad}
              proveedor = {relacionProveedor(producto.IdProveedor)}
            />
          ))
        }
      </div>
      <ModalPP isOpen={isModalOpen} onClose={closeModal} isPP={isProducto} dataProveedores={proveedores} fetchProductos={fetchAll}/>
    </div>
  );
}

export default Inventario;