import { IUserRepo } from "../models/models";
import { RepoCard } from "./RepoCard"; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './DopInfo.module.scss'

interface DopInfo {
  visibility: boolean,
  dopInfo: IUserRepo | ''
}

export function DopInfo( {visibility, dopInfo}: DopInfo) {
  return (
    <>
      {/* контейнер Box для доп. информации о репозитории */}
      {visibility && !dopInfo ? <div className={styles.wrapper}>
          <Typography variant='h5' className={styles.text}>
            Выберите репозиторий
          </Typography>
        </div> :
      <Box className={styles.card}>
        {dopInfo && visibility && <div>
          <RepoCard 
            repo={dopInfo}
          />
        </div>}
      </Box>}
    </>
  )
}
