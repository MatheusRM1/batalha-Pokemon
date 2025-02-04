import "./App.css";
import Barra from "./Barra";

function App() {
  return (
    <div className="tela">
      <div className="containerJogador1">
        <img src="../src/assets/pikachu-seeklogo.svg" width={200}/>
        <Barra />
      </div>
      <div className="containerJogador2">
        <img src="../src/assets/charizard-seeklogo.png" width={300}/>
        <Barra />
      </div>
    </div>
  );
}

export default App;
