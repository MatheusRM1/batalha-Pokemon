import { useState } from "react";
import "./Botoes.css";

interface BotoesProps {
    ataques: { nome: string; dano: number; pp: number }[];
    atacar: (dano: number, pp: number) => void;
    itens: { nome: string; cura: number; recuperaPP: number }[];
    usarItem: (cura: number, recuperaPP: number) => void;
}

export default function Botoes({ataques, atacar, itens, usarItem} : BotoesProps) {
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
          ) : ( !opcoesItens && 
            <button className="botao" onClick={() => setOpcoesAtaque(true)}>
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
                    usarItem(item.cura, item.recuperaPP);
                    setOpcoesItens(false);
                  }}
                >
                  {item.nome}
                  <div className="containerInfo">
                    <p className="info">Cura - {item.cura}</p>
                    <p className="info">RecPP - {item.recuperaPP}</p>
                  </div>
                </button>
              ))}
              <button className="botao" onClick={() => setOpcoesItens(false)}>
                Voltar
              </button>
            </>
          ) : ( !opcoesAtaque &&
            <button className="botao" onClick={() => setOpcoesItens(true)}>
              Itens
            </button>
          )}
        </div>
      </div>
    </>
  );
}
