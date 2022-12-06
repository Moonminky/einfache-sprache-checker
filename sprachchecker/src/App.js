import "./App.css";
import { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

function App() {
  // const [showTextInput, setshowTextInput] = useState(false)
  // const [showTextResult, setshowTextResult] = useState(false)
  const [checks, setChecks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/checks", {
      methods: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setChecks(data.checks))
      .catch(error => console.log(error));
  }, []);

  //run checks
  const runChecks = text => {
    fetch("http://localhost:5000/checks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(text)
    })
      .then(response => response.json())
      .then(data => setChecks(data.checks))
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        <TextInput className="textinput" onSend={runChecks} />
        <AnalysisResult checks={checks} className="analysisresult" />
      </section>
      <Footer />
    </div>
  );
}

export default App;
