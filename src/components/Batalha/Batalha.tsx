import { useState } from "react";
import Barra from "../Barra/Barra";
import Botoes from "../Botoes/Botoes";
import Quadro from "../Quadro/Quadro";
import "./Batalha.css";

export default function Batalha() {
  const [pvJ1, setPvJ1] = useState(100);
  const [pvJ2, setPvJ2] = useState(100);
  const [turno, setTurno] = useState(0);
  const [mensagem, setMensagem] = useState("Comeca o Jogo");

  const [itensJ1, setItensJ1] = useState([
    { nome: "Elidio", cura: 5, recuperaPP: 3, uso: 3 },
    { nome: "Semente", cura: 10, recuperaPP: 3, uso: 2 },
    { nome: "I'am Back", cura: 50, recuperaPP: 3, uso: 1 },
  ]);

  const [itensJ2, setItensJ2] = useState([
    { nome: "Elidio", cura: 5, recuperaPP: 5, uso: 3 },
    { nome: "Semente", cura: 10, recuperaPP: 5, uso: 2 },
    { nome: "I'am Back", cura: 50, recuperaPP: 5, uso: 1 },
  ]);

  const [ataquesJ1, setAtaqueJ1] = useState([
    { nome: "Garra de Dragão", dano: 50, precisao: 75, pp: 5, ppMax: 5 },
    { nome: "Rajada de Fogo", dano: 50, precisao: 80, pp: 5, ppMax: 5 },
    { nome: "Golpe de Ar", dano: 50, precisao: 70, pp: 5, ppMax: 5 },
  ]);

  const [ataquesJ2, setAtaqueJ2] = useState([
    { nome: "Thunderstorm", dano: 50, precisao: 75, pp: 5, ppMax: 5 },
    { nome: "Electro Ball", dano: 50, precisao: 90, pp: 5, ppMax: 5 },
    { nome: "Ataque Rápido", dano: 50, precisao: 80, pp: 5, ppMax: 5 },
  ]);

  function acertou(precisao: number) {
    return Math.random() * 100 <= precisao;
  }

  function Turno(atacante: "J1" | "J2") {
    if (atacante === "J1") return turno % 2 === 0;

    return turno % 2 !== 0;
  }

  function verificaGanhador() {
    if (pvJ1 <= 0 || pvJ2 <= 0) return true;
    else return false;
  }

  function verificaAtaque(atacante: "J1" | "J2", index: number) {
    const ataqueJ1 = [...ataquesJ1];
    const ataqueJ2 = [...ataquesJ2];
    if (
      atacante === "J1" &&
      turno % 2 !== 0 &&
      !verificaGanhador() &&
      ataqueJ1[index].pp > 0
    )
      return true;
    else if (
      atacante === "J2" &&
      turno % 2 === 0 &&
      !verificaGanhador() &&
      ataqueJ2[index].pp > 0
    )
      return false;

    return false;
  }

  function modificaPV(atacante: "J1" | "J2", index: number) {
    const ataqueJ1 = [...ataquesJ1];
    const ataqueJ2 = [...ataquesJ2];

    if (atacante === "J1") {
      if (acertou(ataqueJ1[index].precisao)) {
        setPvJ2((prevPv) => Math.max(prevPv - ataqueJ1[index].dano, 0));
        ataqueJ1[index].pp -= 1;
        setAtaqueJ1(ataqueJ1);
        setMensagem(`O ${ataqueJ1[index].nome} acertou`);
      } else {
        ataqueJ1[index].pp -= 1;
        setAtaqueJ1(ataqueJ1);
        setMensagem(`O ${ataqueJ1[index].nome} errou`);
      }
    } else if (atacante === "J2") {
      if (acertou(ataqueJ2[index].precisao)) {
        setPvJ1((prevPv) => Math.max(prevPv - ataqueJ2[index].dano, 0));
        ataqueJ2[index].pp -= 1;
        setAtaqueJ2(ataqueJ2);
        setMensagem(`O ${ataqueJ2[index].nome} acertou`);
      } else {
        ataqueJ2[index].pp -= 1;
        setAtaqueJ2(ataqueJ2);
        setMensagem(`O ${ataqueJ2[index].nome} errou`);
      }
    }
  }

  function atacar(atacante: "J1" | "J2", index: number) {
    if (verificaAtaque(atacante, index)) {
      modificaPV(atacante, index);
    } else if (!verificaAtaque(atacante, index)) {
      modificaPV(atacante, index);
    }

    setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
  }

  function usarItem(atacante: "J1" | "J2", index: number) {
    const itemJ1 = [...itensJ1];
    const itemJ2 = [...itensJ2];
    const ataqueJ1 = [...ataquesJ1];
    const ataqueJ2 = [...ataquesJ2];

    if (atacante === "J1" && turno % 2 !== 0 && itemJ1[index].uso > 0) {
      setPvJ1((prevPv) =>
        Math.min(Math.max(prevPv + itemJ1[index].cura, 0), 100)
      );
      for (let i = 0; i < ataqueJ1.length; i++) {
        ataqueJ1[i].pp = Math.min(
          ataqueJ1[i].pp + itemJ1[index].recuperaPP,
          ataqueJ1[i].ppMax
        );
      }
      itemJ1[index].uso -= 1;
      setItensJ1(itemJ1);
      setAtaqueJ1(ataqueJ1);
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    } else if (atacante === "J2" && turno % 2 === 0 && itemJ2[index].uso > 0) {
      setPvJ2((prevPv) =>
        Math.min(Math.max(prevPv + itemJ2[index].cura, 0), 100)
      );
      for (let i = 0; i < ataqueJ2.length; i++) {
        ataqueJ2[i].pp = Math.min(
          ataqueJ2[i].pp + itemJ2[index].recuperaPP,
          ataqueJ2[i].ppMax
        );
      }
      itemJ2[index].uso -= 1;
      setItensJ2(itemJ2);
      setAtaqueJ2(ataqueJ2);
      setTurno((prevTurno) => Math.max(prevTurno + 1, 0));
    }
  }

  return (
    <>
      <Quadro pvJ1={pvJ1} pvJ2={pvJ2} turno={turno} descricao={mensagem} />
      <div className="containerJogador1">
        <img src="../src/assets/charizard-seeklogo.png" width={300} />
        <Barra
          pv={pvJ1}
          turno={Turno("J1")}
          ganhador={() => verificaGanhador()}
        >
          <Botoes
            ataques={ataquesJ1}
            atacar={(index) => atacar("J1", index)}
            itens={itensJ1}
            usarItem={(index) => usarItem("J1", index)}
            turno={Turno("J1")}
            ganhador={() => verificaGanhador()}
          />
        </Barra>
      </div>
      <div className="containerJogador2">
        <img src="../src/assets/pikachu-seeklogo.svg" width={300} />
        <Barra
          pv={pvJ2}
          turno={Turno("J2")}
          ganhador={() => verificaGanhador()}
        >
          <Botoes
            ataques={ataquesJ2}
            atacar={(index) => atacar("J2", index)}
            itens={itensJ2}
            usarItem={(index) => usarItem("J2", index)}
            turno={Turno("J2")}
            ganhador={() => verificaGanhador()}
          />
        </Barra>
      </div>
    </>
  );
}
