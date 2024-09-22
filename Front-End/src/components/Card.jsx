import "../assets/styles/Card.css";
import PropTypes from 'prop-types';
function Card(props) {

  return (
    <div className="contenedor-card">
      <h2>{props.nombre}</h2>
      <img src={props.url} alt={props.nombre} />
    </div>
  );
}

Card.propTypes = {
  nombre: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Card;