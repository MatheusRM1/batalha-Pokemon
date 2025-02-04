import "./Barra.css";

export default function Barra() {
  return (
    <div className="container">
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
  );
}
