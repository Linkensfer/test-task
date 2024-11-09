import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styles from './AppBarForSearch.module.scss'

interface AppBarForSearchProps {
  inputText: string,
  setInputText(value: string): void
}

export function AppBarForSearch({inputText, setInputText}: AppBarForSearchProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className={styles.search}>
            <div className={styles.icon}>
              <SearchIcon />
            </div>
            <InputBase
              className={styles.input}
              placeholder="GitHub Search Repositories..."
              inputProps={{ 'aria-label': 'search' }}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
