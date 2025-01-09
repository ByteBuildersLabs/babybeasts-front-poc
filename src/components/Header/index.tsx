import monster from "../../img/logo.jpeg";
import ControllerConnectButton from "../CartridgeController/ControllerConnectButton";
import "./main.css";
import React, { useState } from "react";
import useSound from "use-sound";
import backgroundMusic from "../sounds/happybeast.mp3";

function Header({ onConnect }: { onConnect: () => void }) {
  const [isMuted, setIsMuted] = useState(false); // Estado para controlar el mute
  const [play, { stop, sound }] = useSound(backgroundMusic, {
    loop: true,
    volume: isMuted ? 0 : 0.5, // Ajusta el volumen dinámicamente
  });

  React.useEffect(() => {
    play(); // Reproduce el sonido al cargar el componente
    return () => stop(); // Detiene el sonido al desmontar
  }, [play, stop]);

  const toggleMute = () => {
    if (sound) {
      setIsMuted((prev) => !prev); // Alterna entre mute y unmute
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">
          <img src={monster} alt="Logo" />
        </a>
        <h2>
          Baby <span>Beast</span>
        </h2>
      </div>
      <ControllerConnectButton onConnect={onConnect} />
      <div className="sound-controls">
        <button onClick={toggleMute} className="sound-button">
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </nav>
  );
}

export default Header;