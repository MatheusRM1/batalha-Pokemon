import "./Barra.css";

export default function Barra() {
  return (
    <>
      <div className="container">
        <div className="status">
          <div className="pv">
            <h1>PV</h1>
            <div className="barraContainer">
              <span className="barra">100/100</span>
            </div>
          </div>
          <div className="pf">
            <h1>PF</h1>
            <div className="barraContainer">
              <span className="barraPF">100/100</span>
            </div>
          </div>
        </div>
        <div className="acoes">
          <h1>Ações</h1>
          <div className="containerBotoes">
            <button className="botao">Attack</button>
            <button className="botao">Cura</button>
            <button className="botao">Raio</button>
            <button className="botao">Fogo</button>
          </div>
        </div>
      </div>
    </>
  );
}
