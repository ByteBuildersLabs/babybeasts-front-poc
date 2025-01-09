import { Link } from "react-router-dom";
import Header from "../Header/index.tsx";
import "./main.css";

function BeastsBag() {
  // Datos simulados para las bestias
  const beasts = [
    { player: "Player1", speed: 50, defense: 30 },
    { player: "Player2", speed: 60, defense: 40 },
    { player: "Player3", speed: 70, defense: 50 },
  ];

  // Simula el estado de una cuenta conectada
  const account = true;

  const spawnBeast = () => {
    console.log("Simulating beast spawn...");
    // Aquí podrías agregar lógica para añadir más bestias simuladas si lo deseas
  };

  return (
    <>
      <Header />
      <div className="beasts-bag">
        <div className="eggs">
          <p className={"title text-center mb-4"}>
            You play, feed, sleep and more
            <span className="d-block"> Look at It, otherwise It'll die</span>
          </p>
          <div className="d-flex">
            {beasts.map((beast, index) => (
              <Link to={`/play`} key={index} className="beasts">
                <p>{beast.player}</p>
                <p>{beast.speed}</p>
                <p>{beast.defense}</p>
              </Link>
            ))}
          </div>
        </div>

        <button
          disabled={!account}
          className="button"
          onClick={() => {
            spawnBeast();
            // Simula una recarga de la página
            location.reload();
          }}
        >
          Spawn your BabyBeast
        </button>
      </div>
    </>
  );
}

export default BeastsBag;
