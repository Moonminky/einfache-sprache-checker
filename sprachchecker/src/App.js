import "./App.css";
import { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";
import TextOutput from "./components/TextOutput";

function App() {
  const [textInput, setTextInput] = useState("");
  const [textResult, setTextResult] = useState([]);
  const [showTextResult, setShowTextResult] = useState(false);
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/checks", {
      methods: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setChecks(data.checks);
        setTextResult(data.highlights);
        setTextInput(data.text);
        setShowTextResult(data.highlights? true: false)
      })
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
      //TODO: fix Umlaut issue when sending text
      body: JSON.stringify(text)
    })
      .then(response => response.json())
      .then(data => {
        setChecks(data.checks);
        setTextResult(data.highlights);
        setTextInput(data.text);
        setShowTextResult(data.highlights? true: false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        <TextInput className="textinput" onSend={runChecks} submittedText={textInput} highlights={textResult}/>
        <AnalysisResult checks={checks} className="analysisresult" />
      </section>
      <Footer />
    </div>
  );
}

export default App;
