import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';

function TextFieldComponent({label,icon, boxWidth, value, onChange}) {
  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: {boxWidth}}}>
       {icon}
      <TextField id="input-with-sx" label={label} fullWidth variant="standard" sx={{fontSize: "clamp(0.2rem, calc(2vw + 1rem), 1rem)"}} value={value} onChange={onChange} />
    </Box>
    </>
  )
}

export default TextFieldComponent