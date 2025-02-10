import { ReactNode } from "react";
import "./Barra.css";

interface BarraProps {
  pv: number;
  turno: boolean;
  children: ReactNode;
  ganhador: () => boolean;
}

export default function Barra({ pv, turno, children, ganhador }: BarraProps) {
  return (
    <>
      <div className="container" style={{ opacity: ganhador() ? 1 : turno ? 1 : 0.5, }}>
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
