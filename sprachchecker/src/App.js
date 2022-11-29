import "./App.css";
import { useState } from 'react'
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

function App() {
  // const [showTextInput, setshowTextInput] = useState(false)
  // const [showTextResult, setshowTextResult] = useState(false)
  const [checks, setChecks] = useState([
    {
      name: 'Goethe-Level',
      result: 'pass'
    },
    {
      name: 'Verneinung',
      result: 'fail'
    },
    {
      name: 'Satzzeichen',
      result: 'pass'
    },
    {
      name: 'Zahlen',
      result: 'pass'
    },
    {
      name: 'Satzlänge',
      result: 'fail'
    },
    {
      name: 'Konjunktiv',
      result: 'fail'
    },
    {
      name: 'Passiv',
      result: 'fail'
    }
  ])

  //run checks
  const runChecks = (text) => {
    console.log(text);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        <TextInput className="textinput" onSend={runChecks}/>
        <AnalysisResult checks={checks} className="analysisresult" />
      </section>
      <Footer />
    </div>
  );
}

export default App;
