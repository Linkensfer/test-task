import { IUserRepo } from "../models/models";
import { RepoCard } from "./RepoCard"; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './DopInfo.module.scss'

interface DopInfoProps {
  dopInfo: IUserRepo | null
}

export function DopInfo( {dopInfo}: DopInfoProps) {
  if (!dopInfo) {
    return (
      <div className={styles.wrapper}>
        <Typography variant='h5' className={styles.text}>
          Выберите репозиторий
        </Typography>
      </div>
    )
  }

  return (
    <Box className={styles.card}>
      <RepoCard repo={dopInfo}/>
    </Box>
  )
}
