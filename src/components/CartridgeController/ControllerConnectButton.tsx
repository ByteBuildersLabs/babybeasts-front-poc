import { Link } from "react-router-dom";
import dojo from "../../img/dojo-icon.svg";
import { useState } from "react";

const ControllerConnectButton = ({ onConnect }: { onConnect: () => void }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = () => {
    setAddress("0x1234567890abcdef1234567890abcdef12345678");
    setIsConnected(true);
    onConnect(); // Notifica al componente padre
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <Link to="/">
            <button className="connect-btn" onClick={disconnect}>
              Disconnect ...{address?.slice(-6)}
            </button>
          </Link>
        </div>
      ) : (
        <button onClick={connect} className="connect-btn">
          Connect
          <img src={dojo} alt="starknet" />
        </button>
      )}
    </div>
  );
};

export default ControllerConnectButton;
