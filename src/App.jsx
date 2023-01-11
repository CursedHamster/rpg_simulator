import { useState, useEffect } from "react";
import "./App.css";

import CharacterCard from "./components/CharacterCard";

import allies from "./assets/allies";
import enemies from "./assets/enemies";

function App() {
  const [characterPlayer, setCharacterPlayer] = useState(allies[0]);
  const [characterEnemy, setCharacterEnemy] = useState(enemies[0]);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState(0);

  let attackSound = new Audio("/attack.mp3")

  useEffect(() => {
    setCharacterPlayer(getRandomPlayer());
    setCharacterEnemy(getRandomEnemy());
  }, []);

  function getRandomPlayer() {
    return ({
      ...allies[Math.floor(Math.random() * 10)],
      health: 100,
      attacks: []
    })
  }

  function getRandomEnemy() {
    return ({
      ...enemies[Math.floor(Math.random() * 10)],
      health: 100,
      attacks: []
    })
  }

  function emptyDamage() {
    setCharacterEnemy((prev) => ({
      ...prev,
      attacks: [],
    }));

    setCharacterPlayer((prev) => ({
      ...prev,
      attacks: [],
    }));
  }

  function attackCharacter() {
    const numberOfAttacks = Math.floor(Math.random() * 3) + 1;
    let attacks = [];

    for (let i = 0; i < numberOfAttacks; i++) {
      attacks.push(-(Math.floor(Math.random() * 9) + 1));
    }

    return attacks;
  }

  function attack() {
    emptyDamage();

    const damageEnemy = attackCharacter();
    const damagePlayer = attackCharacter();

    setTimeout(() => {
      setCharacterEnemy((prev) => {
        const newHealth = prev.health + damageEnemy.reduce((d1, d2) => d1 + d2);
        if(winner === 0 && newHealth <= 0) {
          setWinner(1)
          setGameEnded(true)
        } else {
          setTimeout(() => {
            setCharacterPlayer((prev) => {
              const newHealth = prev.health + damagePlayer.reduce((d1, d2) => d1 + d2);
              if(winner === 0 && newHealth <= 0) {
                setWinner(2)
                setGameEnded(true)
              }
              playSound() 
              return {
                ...prev,
                health: newHealth >= 0 ? newHealth : 0,
                attacks: damagePlayer,
              };
            });
          }, 1500);
        }
        playSound() 
        return {
          ...prev,
          health: newHealth >= 0 ? newHealth : 0,
          attacks: damageEnemy,
        };
      });
    }, 500);
  }

  function startGame() {
    setGameEnded(false)
    setWinner(0)
    setCharacterPlayer(getRandomPlayer())
    setCharacterEnemy(getRandomEnemy())
  }

  function playSound() {
    attackSound.volume = 0.2
    attackSound.play()
  }

  return (
    <div className="App">
      <header>
        <img src="icon.png" alt="Dagger Logo" />
        <h1>Fight an evil entity</h1>
        <img src="icon.png" alt="Dagger Logo" />
      </header>
      <div className="characters">
        <CharacterCard player={true} character={characterPlayer} winner={winner === 1} />
        <h1 className="versus">VS</h1>
        <CharacterCard character={characterEnemy} winner={winner === 2} />
      </div>
      {gameEnded ? <button onClick={startGame}>New Game</button> : <button onClick={attack}>Attack</button>}
    </div>
  );
}

export default App;
