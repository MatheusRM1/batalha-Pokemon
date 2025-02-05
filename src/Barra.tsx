import "./Barra.css";

interface BarraProps{
  pv: number;
  pf: number;
  atacar: () => void;
}

export default function Barra({pv, pf, atacar} : BarraProps) {
  return (
    <>
      <div className="container">
        <div className="status">
          <div className="pv">
            <h1>PV</h1>
            <div className="barraContainer">
              <span className="barra" style={{width: `${pv}%`}}>{pv}/100</span>
            </div>
          </div>
          <div className="pf">
            <h1>PF</h1>
            <div className="barraContainer">
              <span className="barraPF" style={{width: `${pf}%`}}>{pf}/100</span>
            </div>
          </div>
        </div>
        <div className="acoes">
          <h1>Ações</h1>
          <div className="containerBotoes">
            <button className="botao" onClick={atacar}>Atacar</button>
            <button className="botao">Cura</button>
            <button className="botao">Raio</button>
            <button className="botao">Fogo</button>
          </div>
        </div>
      </div>
    </>
  );
}
