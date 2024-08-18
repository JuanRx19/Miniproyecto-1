import "../assets/styles/CardProducto.css";

function CardProducto(props) {
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
      </div>
      
    </div>
  );
}

export default CardProducto;
