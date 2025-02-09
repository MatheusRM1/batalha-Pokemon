import { ReactNode } from "react";
import "./Barra.css";

interface BarraProps {
  pv: number;
  turno: boolean;
  children: ReactNode;
}

export default function Barra({ pv, turno, children }: BarraProps) {
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
        </div>
        {children}
      </div>
    </>
  );
}
