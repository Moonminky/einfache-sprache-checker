import React from "react";
import List from '@mui/material/List';
import Check from './Check'

const AnalysisResult = ({ checks }) => {
  return (
    <div className="result">
      <List>
      {checks.map((check) => (
                <Check key={check.name} check={check} />
            ))}
      </List>
    </div>
  );
};

export default AnalysisResult;