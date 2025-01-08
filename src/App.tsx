import { useEffect, useState } from "react";
import { Card, CardContent } from './components/ui/card.tsx';
import { Button } from './components/ui/button';
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun, Swords, ShieldPlus, TestTubeDiagonal, CircleGauge } from 'lucide-react';

import sleep from './img/sleep.gif';
import eat from './img/eat.gif';
import play from './img/play.gif';
import shower from './img/shower.gif';
import happy from './img/happy.gif';
import dead from './img/dead.gif';
import Header from "./components/Header/index.tsx";
import Play from "./components/Play/index.tsx";

function App() {
  const [beast, setBeast] = useState<{
    level: number;
    attack: number;
    defense: number;
    speed: number;
    experience: number;
    energy: number;
    hunger: number;
    happiness: number;
    hygiene: number;
    is_alive: boolean;
  } | null>(null);

  const [currentImage, setCurrentImage] = useState(happy);
  const [isGlowing, setIsGlowing] = useState(false);

  // Función para activar la animación y desactivarla después de un tiempo
  const triggerGlow = () => {
    setIsGlowing(true); // Activa el glow
    setTimeout(() => setIsGlowing(false), 3000); // Desactiva después de 3 segundos
  };

  // Animations
  const showAnimationWithoutTimer = (gifPath: string) => {
    setCurrentImage(gifPath);
  };

  const showAnimation = (gifPath: string) => {
    setCurrentImage(gifPath);
    setTimeout(() => {
      setCurrentImage(happy);
    }, 3000); // 3 seconds
  };

  const showDeathAnimation = () => {
    setCurrentImage(dead);
  };

  // Handle leveling up
  const handleLevelUp = () => {
    if (beast && beast.experience >= beast.level * 100) {
      setBeast((prev) => {
        if (!prev) return null;

        const updatedBeast = {
          ...prev,
          level: prev.level + 1,
          experience: prev.experience - prev.level * 100, // Resta el umbral de experiencia al subir nivel
          attack: prev.attack + 5, // Mejora estadísticas
          defense: prev.defense + 5,
          speed: prev.speed + 2,
          energy: Math.min(100, prev.energy + 10), // Recupera algo de energía
          happiness: Math.min(100, prev.happiness + 10), // Incrementa felicidad
        };

        return updatedBeast;
      });
      setCurrentImage(happy); // Mostrar animación feliz
    }
  };

  useEffect(() => {
    handleLevelUp(); // Revisa si el tamagotchi sube de nivel al cambiar la experiencia
  }, [beast?.experience]);

  useEffect(() => {
    if (beast?.is_alive) {
      const interval = setInterval(() => {
        setBeast((prev) => {
          if (!prev) return null;

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
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [beast?.is_alive]);

  return (
    <>
      <Header />
      {beast ? (
        <div className="tamaguchi">
          <Card>
            <CardContent>
              <div className="space-y-6">
                <div className="scenario flex justify-center items-column" >
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
                  {/* Contenedor para la imagen del tamagotchi con animación */}
                  <div className={`tamagotchi-image-container ${isGlowing ? "glow" : ""}`}>
                    <img src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                  </div>
                </div>
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
                <div className="actions mb-0">
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev!,
                        energy: Math.min(100, prev!.energy + 10),
                        hunger: Math.max(0, prev!.hunger - 10),
                        experience: prev!.experience + 10, // Ganar experiencia
                      }));
                      triggerGlow();
                      showAnimation(eat);
                    }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Pizza /> Feed
                  </Button>
                  <Button
                    onClick={() => { showAnimationWithoutTimer(sleep); triggerGlow(); }}
                    disabled={!beast.is_alive}
                    className="flex items-center button"
                  >
                    <Coffee /> Sleep
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prev) => ({
                        ...prev!,
                        happiness: Math.min(100, prev!.happiness + 10),
                        experience: prev!.experience + 10, // Ganar experiencia
                      }));
                      triggerGlow();
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
                        ...prev!,
                        hygiene: Math.min(100, prev!.hygiene + 10),
                        experience: prev!.experience + 5, // Ganar experiencia
                      }));
                      triggerGlow();
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
                        ...prev!,
                        energy: Math.min(100, prev!.energy + 20),
                        happiness: Math.min(100, prev!.happiness + 10),
                      }));
                      triggerGlow();
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
                      triggerGlow();
                      setCurrentImage(happy);
                    }}
                    disabled={beast.is_alive}
                    className="flex items-center button"
                  >
                    <Sun /> Revive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="cover">
          <Play />
          <button
            className="button"
            onClick={() =>
              setBeast({
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
              })
            }
          >
            Spawn your BabyBeast
          </button>
        </div>
      )}
    </>
  );
}


export default App;
