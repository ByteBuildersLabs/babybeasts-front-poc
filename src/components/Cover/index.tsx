import { useState } from "react";
import Header from "../Header/index.tsx";
import BeastsBag from "../BeastsBag/index.tsx";
import fight from "../../img/banner.jpeg";

function Cover() {
  // Estado para manejar la conexión del usuario
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      {isConnected ? (
        <BeastsBag />
      ) : (
        <>
          <Header onConnect={() => setIsConnected(true)} />
          <div className="cover">
            <p className={"title text-center mb-4"}>
              You play, feed, sleep and more
              <span className="d-block"> Look at It, otherwise It'll die</span>
            </p>
            <div className="mb-3">
              <img src={fight} alt="Fight banner" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cover;
