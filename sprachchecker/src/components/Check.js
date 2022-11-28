import React from "react";
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Check = ({check}) => {
  return (
    <div className={`check ${check.result}`} id={check.name}>
      {check.result == "fail" ? <DangerousIcon/> : CheckCircleIcon} {check.name}</div>
  );
};

export default AnalysisResult;