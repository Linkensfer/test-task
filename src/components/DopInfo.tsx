import { IUserRepo } from "../models/models";
import { RepoCard } from "./RepoCard"; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DopInfo {
  visibility: boolean,
  dopInfo: IUserRepo | ''
}

export function DopInfo( {visibility, dopInfo}: DopInfo) {
  return (
    <>
      {/* контейнер Box для доп. информации о репозитории */}
      {visibility && !dopInfo ? <Box
        sx={{
          width: '25%',
          marginLeft: 1,
          paddingLeft: 3,
          minHeight: '85vh',
          backgroundColor: 'secondary.main',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <Typography variant='h5'
            sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            Выберите репозиторий
          </Typography>
        </Box> :
      <Box
        sx={{
          width: '25%',
          marginLeft: 1,
          paddingLeft: 3,
          backgroundColor: 'secondary.main'
        }}>
        {dopInfo && visibility && <div>
          <RepoCard 
            repo={dopInfo}
          />
        </div>}
      </Box>}
    </>
  )
}
