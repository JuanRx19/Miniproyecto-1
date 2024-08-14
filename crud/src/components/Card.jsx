import "../assets/styles/Card.css";

function Card(props) {

  return (
    <div className="contenedor-card">
      <h2>{props.nombre}</h2>
      <img src={props.imagen} alt={props.nombre} />
    </div>
  );
}

export default Card;