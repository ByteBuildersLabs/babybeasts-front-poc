import monster from "../../img/logo.jpeg";
import ControllerConnectButton from "../CartridgeController/ControllerConnectButton";
import "./main.css";

function Header({ onConnect }: { onConnect: () => void }) {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/"><img src={monster} alt="Logo" /></a>
          <h2>Baby <span>Beast</span></h2>
        </div>
        <ControllerConnectButton onConnect={onConnect} />
      </nav>
    </>
  );
}

export default Header;
