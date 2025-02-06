import { useState } from "react";
import "./Barra.css";

interface BarraProps {
  pv: number;
  pp: number;
  turno: boolean;
  ataques: { nome: string; dano: number; pp: number }[];
  atacar: (dano: number, pp: number) => void;
}

export default function Barra({ pv, pp, ataques, atacar, turno }: BarraProps) {
  const [opcoesAtaque, setOpcoesAtaque] = useState(false);

  return (
    <>
      <div className="container" style={{ opacity: turno ? 0.5 : 1 }}>
        <div className="status">
          <div className="pv">
            <h2>PV</h2>
            <div className="barraContainer">
              <span className="barra" style={{ width: `${pv}%` }}>
                {pv}/100
              </span>
            </div>
          </div>
          <div className="pf">
            <h2>PP</h2>
            <div className="barraContainer">
              <span className="barraPP" style={{ width: `${pp}%` }}>
                {pp}/100
              </span>
            </div>
          </div>
        </div>
        <div className="acoes">
          <h2>Ações</h2>
          <div className="containerBotoes">
            {opcoesAtaque ? (
              <>
                {ataques.map((ataque, index) => (
                  <button
                    key={index}
                    className="botao"
                    onClick={() => {
                      atacar(ataque.dano, ataque.pp);
                      setOpcoesAtaque(false);
                    }}
                  >
                    {ataque.nome}
                    <div className="containerInfo">
                      <p className="info">PP - {ataque.pp}</p>
                      <p className="info">ATK - {ataque.dano}</p>
                    </div>
                  </button>
                ))}
                <button
                  className="botao"
                  onClick={() => setOpcoesAtaque(false)}
                >
                  Voltar
                </button>
              </>
            ) : (
              <button
                className="botao"
                onClick={() => setOpcoesAtaque(true)}
              >
                Atacar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
