import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cover from "./components/Cover/index.tsx";
import Tamagotchi from "./components/Tamagotchi/index.tsx";
import "./index.css";

function main() {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.render(
      <StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Cover />} />
            <Route path="/play" element={<Tamagotchi />} />
          </Routes>
        </Router>
      </StrictMode>,
      rootElement
    );
  }
}

main();
