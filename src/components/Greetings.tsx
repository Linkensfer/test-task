import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface dropdownVisibility {
  visibility: boolean
}

export function Greetings( {visibility}: dropdownVisibility) {
  return (
    visibility ? <h1>Результаты поиска</h1> :
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: '100vh' }}>
        <Typography variant='h2'
          sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
          Добро пожаловать
        </Typography>
      </Box>
  )
}
