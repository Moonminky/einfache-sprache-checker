import React from "react";
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Check = ({check}) => {
  return (
    <ListItem key={check.name} className={`check ${check.result}`} component="div" disablePadding>
      {check.result === "fail" ? <DangerousIcon/> : <CheckCircleIcon/>}
      <ListItemText primary={check.name}/></ListItem>
  );
};

export default Check;