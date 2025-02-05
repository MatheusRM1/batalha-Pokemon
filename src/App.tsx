import { useState } from "react";
import "./App.css";
import Barra from "./Barra";

function App() {

  const [pvP1, setPvP1] = useState(100);
  const [pfP1, setPfP1] = useState(100);
  const [pvP2, setPvP2] = useState(100);
  const [pfP2, setPfP2] = useState(100);

  function atacar(atacante: "P1" | "P2") {
    if (atacante === "P1" && pfP1 >= 10) {
      setPvP2((prevPv) => Math.max(prevPv - 20, 0));
      setPfP1((prevPf) => Math.max(prevPf - 10, 0)); 
    } else if (atacante === "P2" && pfP2 >= 10) {
      setPvP1((prevPv) => Math.max(prevPv - 20, 0)); 
      setPfP2((prevPf) => Math.max(prevPf - 10, 0)); 
    }
  }

  return (
    <div className="tela">
      <div className="containerJogador1">
        <img src="../src/assets/pikachu-seeklogo.svg" width={200}/>
        <Barra pv={pvP1} pf={pfP1} atacar={() => atacar("P1")} />
      </div>
      <div className="containerJogador2">
        <img src="../src/assets/charizard-seeklogo.png" width={300}/>
        <Barra pv={pvP2} pf={pfP2} atacar={() => atacar("P2")} />
      </div>
    </div>
  );
}

export default App;
