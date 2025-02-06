import { useState } from "react";
import "./Botoes.css";

interface BotoesProps {
    ataques: { nome: string; dano: number; pp: number }[];
    atacar: (dano: number, pp: number) => void;
}

export default function Botoes({ataques, atacar} : BotoesProps) {
    const [opcoesAtaque, setOpcoesAtaque] = useState(false);
  return (
    <>
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
              <button className="botao" onClick={() => setOpcoesAtaque(false)}>
                Voltar
              </button>
            </>
          ) : (
            <button className="botao" onClick={() => setOpcoesAtaque(true)}>
              Atacar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
