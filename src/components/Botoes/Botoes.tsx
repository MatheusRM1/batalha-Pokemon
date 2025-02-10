import { useState } from "react";
import "./Botoes.css";

interface BotoesProps {
    ataques: { nome: string; dano: number; pp: number }[];
    atacar: (index: number) => void;
    itens: { nome: string; cura: number; uso: number }[];
    usarItem: (index: number) => void;
    ganhador: () => boolean;
    turno: boolean;
}

export default function Botoes({ataques, atacar, itens, usarItem, turno, ganhador} : BotoesProps) {
    const [opcoesAtaque, setOpcoesAtaque] = useState(false);
    const [opcoesItens, setOpcoesItens] = useState(false);

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
                    atacar(index);
                    setOpcoesAtaque(false);
                  }}
                  disabled={ataque.pp === 0}
                >
                  {ataque.nome}
                  <div className="containerInfo">
                    <p className="info">PP/{ataque.pp}</p>
                    <p className="info">ATK/{ataque.dano}</p>
                  </div>
                </button>
              ))}
              <button className="botao" onClick={() => setOpcoesAtaque(false)}>
                Voltar
              </button>
            </>
          ) : ( !opcoesItens && 
            <button className="botao" disabled={!turno || ganhador()} onClick={() => setOpcoesAtaque(true)}>
              Atacar
            </button>
          )}
           {opcoesItens ? (
            <>
              {itens.map((item, index) => (
                <button
                  key={index}
                  className="botao"
                  onClick={() => {
                    usarItem(index);
                    setOpcoesItens(false);
                  }}
                  disabled={item.uso === 0}
                >
                  {item.nome}
                  <div className="containerInfo">
                    <p className="info">Cura/{item.cura}</p>
                    <p className="info">Uso/{item.uso}</p>
                  </div>
                </button>
              ))}
              <button className="botao" onClick={() => setOpcoesItens(false)}>
                Voltar
              </button>
            </>
          ) : ( !opcoesAtaque &&
            <button className="botao" disabled={!turno || ganhador()} onClick={() => setOpcoesItens(true)}>
              Itens
            </button>
          )}
        </div>
      </div>
    </>
  );
}
