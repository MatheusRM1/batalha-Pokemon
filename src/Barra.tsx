import "./Barra.css";

interface BarraProps {
  pv: number;
  pf: number;
  turno: boolean;
  atacar: () => void;
}

export default function Barra({ pv, pf, atacar, turno }: BarraProps) {
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
            <h2>PF</h2>
            <div className="barraContainer">
              <span className="barraPF" style={{ width: `${pf}%` }}>
                {pf}/100
              </span>
            </div>
          </div>
        </div>
        <div className="acoes">
          <h2>Ações</h2>
          <div className="containerBotoes">
            <button className="botao" onClick={atacar}>
              Atacar
            </button>
            <button className="botao">Cura</button>
            <button className="botao">Raio</button>
            <button className="botao">Fogo</button>
          </div>
        </div>
      </div>
    </>
  );
}
