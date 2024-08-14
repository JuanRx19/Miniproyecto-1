import "../assets/styles/Inicio.css";
import Card from "./Card"

function Inicio() {
  const cards = [
    { nombre:"Juan Miguel Rojas", url: null },
    { nombre:"Rafael Hermida" , url: null },
    { nombre:"Miguel Sanchez", url: null },
    { nombre:"Bairon Torres", url: "blob:https://web.whatsapp.com/ef120996-8cdf-4013-8900-d527f315cb59" }];

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