import { useState } from "react";
import "./App.css";
import Barra from "./Barra";
import Botoes from "./Botoes";
import Quadro from "./Quadro";

function App() {
  const [pvJ1, setPvJ1] = useState(100);
  const [pvJ2, setPvJ2] = useState(100);
  const [turno, setTurno] = useState(0);

  const [itensJ1, setItensJ1] = useState([
    { nome: "Elidio", cura: 5, uso: 3 },
    { nome: "Semente", cura: 10, uso: 2 },
    { nome: "Welcome", cura: 50, uso: 1 },
  ]);

  const [itensJ2, setItensJ2] = useState([
    { nome: "Elidio", cura: 5, uso: 3 },
    { nome: "Semente", cura: 10, uso: 2 },
    { nome: "Welcome", cura: 50, uso: 1 },
  ]);

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

  function atacar(atacante: "J1" | "J2", index: number) {
    const ataqueJ1 = structuredClone(ataquesJ1[index]);
    const ataqueJ2 = structuredClone(ataquesJ2[index]);
    if (
      atacante === "J1" &&
      turno % 2 !== 0 &&
      pvJ1 > 0 &&
      pvJ2 > 0 &&
      ataqueJ1.pp > 0
    ) {
      setPvJ2((prevPv) => Math.max(prevPv - ataqueJ1.dano, 0));
      ataqueJ1.pp -= 1;
      ataquesJ1[index] = ataqueJ1;
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    } else if (
      atacante === "J2" &&
      turno % 2 === 0 &&
      pvJ1 > 0 &&
      pvJ2 > 0 &&
      ataqueJ2.pp > 0
    ) {
      setPvJ1((prevPv) => Math.max(prevPv - ataqueJ2.dano, 0));
      ataqueJ2.pp -= 1;
      ataquesJ2[index] = ataqueJ2;
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    }
  }

  function usarItem(atacante: "J1" | "J2", index: number) {
    const itemJ1 = [...itensJ1];
    const itemJ2 = [...itensJ2];

    if (atacante === "J1" && turno % 2 !== 0 && itemJ1[index].uso > 0) {
      setPvJ1((prevPv) => Math.min(Math.max(prevPv + itemJ1[index].cura, 0), 100));
      itemJ1[index].uso -= 1;
      setItensJ1(itemJ1);
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    } else if (atacante === "J2" && turno % 2 === 0 && itemJ2[index].uso > 0) {
      setPvJ2((prevPv) => Math.min(Math.max(prevPv + itemJ2[index].cura, 0), 100));
      itemJ2[index].uso -= 1;
      setItensJ2(itemJ2);
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
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
      <Quadro pvJ1={pvJ1} pvJ2={pvJ2} turno={turno} />
      <div className="containerJogador1">
        <img src="../src/assets/charizard-seeklogo.png" width={300} />
        <Barra pv={pvJ1} turno={TurnoJ1()}>
          <Botoes
            ataques={ataquesJ1}
            atacar={(index) => atacar("J1", index)}
            itens={itensJ1}
            usarItem={(index) => usarItem("J1", index)}
            turno={TurnoJ1()}
          />
        </Barra>
      </div>
      <div className="containerJogador2">
        <img src="../src/assets/pikachu-seeklogo.svg" width={300} />
        <Barra pv={pvJ2} turno={TurnoJ2()}>
          <Botoes
            ataques={ataquesJ2}
            atacar={(index) => atacar("J2", index)}
            itens={itensJ2}
            usarItem={(index) => usarItem("J2", index)}
            turno={TurnoJ2()}
          />
        </Barra>
      </div>
    </div>
  );
}

export default App;
