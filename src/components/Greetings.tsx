import Typography from '@mui/material/Typography';
import styles from './Greetings.module.scss'

interface GreetingsProps {
  visibility: boolean
}

export function Greetings( {visibility}: GreetingsProps) {
  if (visibility) {
    return <h1>Результаты поиска</h1>
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant='h2' className={styles.text}>
        Добро пожаловать
      </Typography>
    </div>
  )
}
