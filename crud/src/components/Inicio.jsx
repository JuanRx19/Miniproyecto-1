import "../assets/styles/Inicio.css";
import Card from "./Card"

function Inicio() {
  const cards = [
    { nombre:"Juan Miguel Rojas", url: "../../public/img/juanito.jpeg" },
    { nombre:"Rafael Hermida" , url: "../../public/img/rafa.jpeg" },
    { nombre:"Miguel Sanchez", url: "../../public/img/miguelacho.jpeg" },
    { nombre:"Bairon Torres", url: "../../public/img/bairon.jpg" }];

  return (
    <div className="contenedor-inicio">
      <h1>Bienvenido al SuperMercado XYZ</h1>
      <div className="contenedor-card">
        {
          cards.map((card, index) => (
            <Card key={index}
            nombre = {card.nombre}
            url = {card.url}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Inicio;