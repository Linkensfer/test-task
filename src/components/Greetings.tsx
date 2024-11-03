import Typography from '@mui/material/Typography';
import styles from './Greetings.module.scss'

interface dropdownVisibility {
  visibility: boolean
}

export function Greetings( {visibility}: dropdownVisibility) {
  return (
    visibility ? <h1>Результаты поиска</h1> :
      <div className={styles.wrapper}>
        <Typography variant='h2' className={styles.text}>
          Добро пожаловать
        </Typography>
      </div>
  )
}
