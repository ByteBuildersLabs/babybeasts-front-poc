"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Heart, Pizza, Coffee, Bath, Gamepad2, Sun } from 'lucide-react';

import sleep from './img/sleep.gif';
import eat from './img/eat.gif';
import play from './img/play.gif';
import shower from './img/shower.gif';
import happy from './img/happy.gif';
import dead from './img/dead.gif';
import Header from "./components/Header/index";
import Play from "./components/Play/index";
import { StaticImageData } from 'next/image';


export default function Home() {
  const [beast, setBeast] = useState({
    level: 1,
    attack: 10,
    defense: 10,
    speed: 10,
    experience: 0,
    energy: 100,
    hunger: 100,
    happiness: 100,
    hygiene: 100,
    is_alive: true,
  });

  const [currentImage, setCurrentImage] = useState<StaticImageData>(happy);

  // Animations
  const showAnimation = (gifPath: StaticImageData) => {
    setCurrentImage(gifPath);
    setTimeout(() => {
      setCurrentImage(happy);
    }, 3000); // 3 seconds
  };

  const showDeathAnimation = () => {
    setCurrentImage(dead);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (beast.is_alive) {
        setBeast((prevBeast) => ({
          ...prevBeast,
          energy: Math.max(0, prevBeast.energy - 5),
          hunger: Math.max(0, prevBeast.hunger - 5),
          happiness: Math.max(0, prevBeast.happiness - 5),
          hygiene: Math.max(0, prevBeast.hygiene - 5),
        }));

        if (
          beast.energy === 0 &&
          beast.hunger === 0 &&
          beast.happiness === 0 &&
          beast.hygiene === 0
        ) {
          setBeast((prevBeast) => ({ ...prevBeast, is_alive: false }));
          showDeathAnimation();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [beast.is_alive, beast.energy, beast.hunger, beast.happiness, beast.hygiene]);

  return (
    <>
      <Header />
      {beast.is_alive ? (
        <div className="tamaguchi">
          <Card>
            <CardContent>
              <div className="space-y-6">
                <div className="scenario flex justify-center items-column">
                  <h2 className="level">Lvl <span>{beast.level}</span></h2>
                  <div className="stats">
                    <div className="item">
                      <span>{Math.round(beast.attack)}</span>
                      <p className="info">Attack</p>
                    </div>
                    <div className="item">
                      <span>{Math.round(beast.defense)}</span>
                      <p className="info">Defense</p>
                    </div>
                    <div className="item">
                      <span>{Math.round(beast.speed)}</span>
                      <p className="info">Speed</p>
                    </div>
                    <div className="item">
                      <span>{beast.experience}</span>
                      <p className="info">Experience</p>
                    </div>
                  </div>
                  <Image src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                  <Image src={currentImage} alt="Tamagotchi" className="w-40 h-40" />
                </div>
                <div className="status">
                  <div className="item">
                    <Heart />
                    <span>{Math.round(beast.energy)}%</span>
                  </div>
                  <div className="item">
                    <Coffee />
                    <span>{Math.round(beast.hunger)}%</span>
                  </div>
                  <div className="item">
                    <Gamepad2 />
                    <span>{Math.round(beast.happiness)}%</span>
                  </div>
                  <div className="item">
                    <Bath />
                    <span>{Math.round(beast.hygiene)}%</span>
                  </div>
                </div>
                <div className="actions">
                  <Button
                    onClick={() => {
                      setBeast((prevBeast) => ({
                        ...prevBeast,
                        hunger: Math.min(100, prevBeast.hunger + 20),
                      }));
                      showAnimation(eat);
                    }}
                  >
                    <Pizza /> Feed
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prevBeast) => ({
                        ...prevBeast,
                        energy: Math.min(100, prevBeast.energy + 20),
                      }));
                      showAnimation(sleep);
                    }}
                  >
                    <Coffee /> Sleep
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prevBeast) => ({
                        ...prevBeast,
                        happiness: Math.min(100, prevBeast.happiness + 20),
                      }));
                      showAnimation(play);
                    }}
                  >
                    <Gamepad2 /> Play
                  </Button>
                  <Button
                    onClick={() => {
                      setBeast((prevBeast) => ({
                        ...prevBeast,
                        hygiene: Math.min(100, prevBeast.hygiene + 20),
                      }));
                      showAnimation(shower);
                    }}
                  >
                    <Bath /> Clean
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="cover">
          <Play />
          <Button
            onClick={() => {
              setBeast((prevBeast) => ({
                ...prevBeast,
                is_alive: true,
                energy: 100,
                hunger: 100,
                happiness: 100,
                hygiene: 100,
              }));
              setCurrentImage(happy);
            }}
          >
            <Sun /> Revive
          </Button>
        </div>
      )}
    </>
  );
}
