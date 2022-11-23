import "./App.css";
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        <TextInput className="textinput" />
        <AnalysisResult className="analysisresult" />
      </section>
    </div>
  );
}

export default App;
