import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

interface AppBarForSearch {
  inputText: string,
  setInputText(value: string): void
}

export function AppBarForSearch({inputText, setInputText}: AppBarForSearch) {
  // AppBar и InputBase
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius, // скругления по углам прямоугольника
    backgroundColor: alpha(theme.palette.common.white, 0.15), // цвета фона строки поиска
    '&:hover': { // изменение цвета фона строки поиска при наведении курсора
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { // растягивание на всю страницу строки поиска
      marginLeft: theme.spacing(1), // отступ слева для строки поиска
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2), // позиционизрование иконки отступами: сверху-снихзу, справа-слева
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit', // цвет дефолтного текста строки поиска
    width: '100%', // исходная ширина строки поиска
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 10), // отступы: сверху, справа, снизу, слева
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '26ch', // исходная ширина строки поиска
        '&:focus': {
          width: '34ch',  // ширина строки поиска при наведении на неё
        },
      },
    },
  }));
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="GitHub Search Repositories..."
              inputProps={{ 'aria-label': 'search' }}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </Search>
          {/* <Button variant="contained" sx={{ marginLeft: 2 }}>ИСКАТЬ</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
