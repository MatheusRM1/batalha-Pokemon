import "./Quadro.css";

interface QuadroProps{
    pvJ1: number;
    pvJ2: number;
    turno: number;
    descricao: string;
    ganhador: () =>boolean;
    resetar: () =>void;
}

export default function Quadro({pvJ1, pvJ2, turno, descricao, ganhador, resetar}: QuadroProps) {
  return (
    <>
      <div className="quadro">
        {pvJ1 === 0 ? (
          <p className="rodada">Vitória do Jogador 1</p>
        ) : pvJ2 === 0 ? (
          <p className="rodada">Vitória do Jogador 2</p>
        ) : turno % 2 === 0 ? (
          <p className="rodada">Vez do jogador 1</p>
        ) : (
          <p className="rodada">Vez do Jogador 2</p>
        )}

        { ganhador() ?  <button className="reinicia" onClick={() => resetar()}>Reiniciar</button> : <p className="mensagem">{descricao}</p> }
      </div>
    </>
  );
}
