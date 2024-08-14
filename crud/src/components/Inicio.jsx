import "../assets/styles/Inicio.css";
import Card from "./Card"

function Inicio() {
  const cards = [
    { nombre:"Juan Miguel Rojas", url: null },
    { nombre:"Rafael Hermida" , url: null },
    { nombre:"Miguel Sanchez", url: null },
    { nombre:"Bairon Torres", url: "https://http2.mlstatic.com/D_Q_NP_2X_941189-MLA52773387142_122022-AB.webp" }];

  return (
    <div className="contenedor-inicio">
      <h1>Bienvenido al SuperMercado XYZ</h1>
      <div className="contenedor-cards">
        {
          cards.map((card, index) => (
            <Card key={index}
            nombre = {card.nombre}
            imagen = {card.url}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Inicio;