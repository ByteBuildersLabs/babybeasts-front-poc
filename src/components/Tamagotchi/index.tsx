import { useEffect, useState } from "react";
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun, Swords, ShieldPlus, TestTubeDiagonal, CircleGauge } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Header from "../Header/index.tsx";
import sleep from "../../img/sleep.gif";
import eat from "../../img/eat.gif";
import play from "../../img/play.gif";
import shower from "../../img/shower.gif";
import happy from "../../img/happy.gif";
import dead from "../../img/dead.gif";
import "./main.css";

function Tamagotchi() {
  // Datos simulados para el tamagotchi
  const [beast, setBeast] = useState({
    level: 1,
    attack: 10,
    defense: 10,
    speed: 10,
    experience: 0,
    energy: 100,
    hunger: 0,
    happiness: 100,
    hygiene: 100,
    is_alive: true,
  });

  const [currentImage, setCurrentImage] = useState(happy);

  // Animaciones
  const showAnimationWithoutTimer = (gifPath: string) => {
    setCurrentImage(gifPath);
  };
  const showAnimation = (gifPath: string) => {
    setCurrentImage(gifPath);
    setTimeout(() => {
      setCurrentImage(happy);
    }, 3000); // Duración de la animación (3 segundos)
  };
  const showDeathAnimation = () => {
    setCurrentImage(dead);
  };

  // Simulación de disminución de estadísticas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setBeast((prev) => {
        if (!prev.is_alive) return prev;

        const updatedBeast = {
          ...prev,
          energy: Math.max(0, prev.energy - 5),
          hunger: Math.min(100, prev.hunger + 5),
          happiness: Math.max(0, prev.happiness - 5),
          hygiene: Math.max(0, prev.hygiene - 5),
        };

        if (updatedBeast.energy === 0 || updatedBeast.hunger === 100) {
          updatedBeast.is_alive = false;
          showDeathAnimation();
        }

        return updatedBeast;
      });
    }, 5000); // Cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!beast.is_alive) {
      showDeathAnimation();
    }
  }, [beast.is_alive]);

  return (
    <>
      <Header />
      <div className="tamaguchi">
        {beast && (
          <Card>
            <CardContent>
              <div className="space-y-6">
                {/* Información del tamagotchi */}
                <div className="scenario flex justify-center items-column">
                  <h2 className="level">
                    Lvl <span>{beast.level}</span>
                  </h2>
                  <div className="stats">
                    <div className="item">
                      <div>
                        <Swords />
                        <span>{Math.round(beast.attack)}</span>
                      </div>
                      <p className="info">Attack</p>
                    </div>
                    <div className="item">
                      <div>
                        <ShieldPlus />
                        <span>{Math.round(beast.defense)}</span>
                      </div>
                      <p className="info">Defense</p>
                    </div>
                    <div className="item">
                      <div>
                        <CircleGauge />
                        <span>{Math.round(beast.speed)}</span>
                      </div>
                      <p className="info">Speed</p>
                    </div>
                    <div className="item">
                      <div>
                        <TestTubeDiagonal />
                        <span>{beast.experience}</span>
                      </div>
                      <p className="info">Experience</p>
                    </div>
                  </div>
                  <img src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                </div>

                {/* Estado del tamagotchi */}
                <div className="d-flex justify-content-center">
                  <div className="status">
                    <div className="item">
                      <div>
                        <Heart />
                        <span>{Math.round(beast.energy)}%</span>
                      </div>
                      <p className="info">Energy</p>
                    </div>
                    <div className="item">
                      <div>
                        <Coffee />
                        <span>{Math.round(beast.hunger)}%</span>
                      </div>
                      <p className="info">Hunger</p>
                    </div>
                    <div className="item">
                      <div>
                        <Gamepad2 />
                        <span>{Math.round(beast.happiness)}%</span>
                      </div>
                      <p className="info">Happiness</p>
                    </div>
                    <div className="item">
                      <div>
                        <Bath />
                        <span>{Math.round(beast.hygiene)}%</span>
                      </div>
                      <p className="info">Hygiene</p>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="actions mb-0">
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev,
                        energy: Math.min(100, prev.energy + 10),
                        hunger: Math.max(0, prev.hunger - 10),
                        experience: prev.experience + 10, // Ganar experiencia
                      }));
                      showAnimation(eat);
                    }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Pizza /> Feed
                  </Button>
                  <Button
                    onClick={() => showAnimationWithoutTimer(sleep)}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Coffee /> Sleep
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev,
                        happiness: Math.min(100, prev.happiness + 10),
                        experience: prev.experience + 10,
                      }));
                      showAnimation(play);
                    }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Gamepad2 /> Play
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev,
                        hygiene: Math.min(100, prev.hygiene + 10),
                        experience: prev.experience + 5,
                      }));
                      showAnimation(shower);
                    }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Bath /> Clean
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev,
                        energy: Math.min(100, prev.energy + 20),
                        happiness: Math.min(100, prev.happiness + 10),
                      }));
                      setCurrentImage(happy);
                    }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Sun /> Wake Up
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast({
                        level: 1,
                        attack: 10,
                        defense: 10,
                        speed: 10,
                        experience: 0,
                        energy: 50,
                        hunger: 50,
                        happiness: 50,
                        hygiene: 50,
                        is_alive: true,
                      });
                      setCurrentImage(happy);
                    }}
                    disabled={beast.is_alive}
                    className="flex items-center button"
                  >
                    <Sun /> Revive
                  </Button>
                </div>
                <p className="info mt-3">
                  You can revive your baby beast, but this one is gonna lose the experience earned.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default Tamagotchi;
