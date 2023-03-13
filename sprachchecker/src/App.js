import "./App.css";
import { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [textInput, setTextInput] = useState("");
  const [textResult, setTextResult] = useState([]);
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setTextInput(data.text.normalize('NFC').replace(/[\u0300-\u0302\u0304-\u036f]/g, ''));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  //run checks
  const runChecks = (text, level) => {
    setLoading(true);
    fetch("http://localhost:5000/checks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text, level})
    })
      .then(response => response.json())
      .then(data => {
        setChecks(data.checks);
        setTextResult(data.highlights);
        setTextInput(data.text.normalize('NFC').replace(/[\u0300-\u0302\u0304-\u036f]/g, ''));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Einfache Sprache Quick-Check</h1>
      </header>
      <section className="textanalysis">
        {loading ? (
          <TailSpin type="TailSpin" color="#00BFFF" height={80} width={80} />
        ) : (
          <TextInput
            className="textinput"
            onSend={runChecks}
            submittedText={textInput}
            highlights={textResult}
          />
        )}
        <AnalysisResult checks={checks} className="analysisresult" />
      </section>
      <Footer />
    </div>
  );
}

export default App;
