import monster from "../../img/logo.jpeg";
import ControllerConnectButton from "../CartridgeController/ControllerConnectButton";
import "./main.css";
import React, { useState } from "react";
import useSound from "use-sound";
import backgroundMusic from "../sounds/happybeast.mp3";

function Header({ onConnect }: { onConnect: () => void }) {
  const [isMuted, setIsMuted] = useState(false); // State to control mute
  const [play, { stop, sound }] = useSound(backgroundMusic, {
    loop: true,
    volume: isMuted ? 0 : 0.5, // Adjust volume dynamically
  });

  React.useEffect(() => {
    play(); // Play sound when component loads
    return () => stop(); // Stop sound when component unmounts
  }, [play, stop]);

  const toggleMute = () => {
    if (sound) {
      setIsMuted((prev) => !prev); // Toggle between mute and unmute
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