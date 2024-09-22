import "../assets/styles/CardReporte.css";
import PropTypes from 'prop-types';
function CardReporte(props) {

  return (
    <div className="contenedor-card-reporte">
      <h2>{props.nombre}</h2>
      <img src={props.url} alt={props.nombre} />
    </div>
  );
}

CardReporte.propTypes = {
  nombre: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CardReporte;