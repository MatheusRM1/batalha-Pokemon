import { useState } from "react";
import "./App.css";
import Barra from "./Barra";
import Botoes from "./Botoes";

function App() {
  const [pvJ1, setPvJ1] = useState(100);
  const [ppJ1, setPpJ1] = useState(100);
  const [pvJ2, setPvJ2] = useState(100);
  const [ppJ2, setPpJ2] = useState(100);
  const [turno, setTurno] = useState(0);

  const itensJ = [
    { nome: "Elidio", cura: 5, recuperaPP: 0 },
    { nome: "Semente", cura: 10, recuperaPP: 5 },
    { nome: "Welcome", cura: 50, recuperaPP: 40 },
  ];

  const ataquesJ1 = [
    { nome: "Garra de Dragão", dano: 5, pp: 10 },
    { nome: "Rajada de Fogo", dano: 30, pp: 25 },
    { nome: "Golpe de Ar", dano: 10, pp: 15 },
  ];

  const ataquesJ2 = [
    { nome: "Thunderstorm", dano: 15, pp: 10 },
    { nome: "Electro Ball", dano: 20, pp: 30 },
    { nome: "Ataque Rápido", dano: 5, pp: 8 },
  ];

  function atacar(atacante: "J1" | "J2", dano: number, pp: number) {
    if (
      atacante === "J1" &&
      ppJ1 >= 10 &&
      turno % 2 !== 0 &&
      pvJ1 > 0 &&
      pvJ2 > 0
    ) {
      setPvJ2((prevPv) => Math.max(prevPv - dano, 0));
      setPpJ1((prevPp) => Math.max(prevPp - pp, 0));
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    } else if (
      atacante === "J2" &&
      ppJ2 >= 10 &&
      turno % 2 === 0 &&
      pvJ1 > 0 &&
      pvJ2 > 0
    ) {
      setPvJ1((prevPv) => Math.max(prevPv - 20, 0));
      setPpJ2((prevPp) => Math.max(prevPp - pp, 0));
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    }
  }

  function usarItem(atacante: "J1" | "J2", cura: number, recuperaPP: number){
    if(atacante === "J1"){
      setPvJ1((prevPv) => Math.min(Math.max(prevPv + cura, 0), 100));
      setPpJ1((prevPp) => Math.min(Math.max(prevPp + recuperaPP, 0), 100));
    } else if(atacante === "J2"){
      setPvJ2((prevPv) => Math.min(Math.max(prevPv + cura, 0), 100));
      setPpJ2((prevPp) => Math.min(Math.max(prevPp + recuperaPP, 0), 100));
    }
  }

  function TurnoJ1() {
    return turno % 2 === 0;
  }

  function TurnoJ2() {
    return turno % 2 !== 0;
  }

  return (
    <div className="tela">
      <div className="quadro">
        {pvJ1 <= 0 ? (
          <p className="rodada">Vitória do Jogador 1</p>
        ) : pvJ2 <= 0 ? (
          <p className="rodada">Vitória do Jogador 2</p>
        ) : turno % 2 === 0 ? (
          <p className="rodada">Vez do jogador 1</p>
        ) : (
          <p className="rodada">Vez do Jogador 2</p>
        )}
      </div>
      <div className="containerJogador1">
        <img src="../src/assets/charizard-seeklogo.png" width={300} />
        <Barra pv={pvJ1} pp={ppJ1} turno={TurnoJ1()}>
          <Botoes
            ataques={ataquesJ1}
            atacar={(dano, pp) => atacar("J1", dano, pp)}
            itens={itensJ}
            usarItem={(cura, recuperaPP) => usarItem("J1", cura, recuperaPP)}
          />
        </Barra>
      </div>
      <div className="containerJogador2">
        <img src="../src/assets/pikachu-seeklogo.svg" width={300} />
        <Barra pv={pvJ2} pp={ppJ2} turno={TurnoJ2()}>
          <Botoes
            ataques={ataquesJ2}
            atacar={(dano, pp) => atacar("J2", dano, pp)}
            itens={itensJ}
            usarItem={(cura, recuperaPP) => usarItem("J2", cura, recuperaPP)}
          />
        </Barra>
      </div>
    </div>
  );
}

export default App;
