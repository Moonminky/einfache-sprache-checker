import React from "react";
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AnalysisResult = () => {
  return (
    <div className="result">
      <ul>
          <li id="goethe" className="pass"><DangerousIcon/> Goethe-Level</li>
          <li id="not" className="fail"><DangerousIcon/> Verneinung mit "nicht"</li>
          <li id="punctuation" className="fail"><DangerousIcon/> Satzzeichen</li>
          <li id="numbers" className="pass"><DangerousIcon/> Zahlen</li>
          <li id="sentencelength" className="fail"><DangerousIcon/> Satzlänge</li>
          <li id="subjunctive" className="fail"><DangerousIcon/> Konjuktiv</li>
          <li id="passive" className="fail"><DangerousIcon/> Passiv</li>
      </ul>
    </div>
  );
};

export default AnalysisResult;