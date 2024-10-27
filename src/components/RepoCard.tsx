import { IUserRepo } from "../models/models";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';

export function RepoCard({repo}: { repo: IUserRepo}) { // аргумент функции {repo}, для которого написан интерфейс { repo: IUserRepo}
  return (
    <>
      <Box>
        <h2>{repo.name}</h2>
        <h2>
          {<StarBorderIcon />}
          {repo.stargazers_count}
        </h2>
        <h2>{repo.description}</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {repo.topics.map((item) => (
              <Stack direction="row" spacing={1} key={item}>
                <Chip label={item} variant="outlined"/>
              </Stack>
            ))}
          </Grid>
        </Box>
        <h2>{repo.license?.name}</h2>
      </Box>
    </>
  )
}
