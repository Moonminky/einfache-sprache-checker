import "./App.css";
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        <TextInput className="textinput" />
        <AnalysisResult className="analysisresult" />
      </section>
      <Footer />
    </div>
  );
}

export default App;
