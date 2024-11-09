import { Response } from "../getGitHubRepositories";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationOfServerResponseProps {
  repo: Response | undefined,
  isFetching: boolean,
  perPage: number,
  setPage(value: number): void
}

const DEFAULT_MAX_TOTAL_COUNT = 1000

export function PaginationOfServerResponse( {repo, isFetching, perPage, setPage}: PaginationOfServerResponseProps) {
  // получения максимального кол-ва страниц при поиске
  const totalCount = repo?.totalCount
  const maxPageCount = totalCount && Math.ceil(Math.min(totalCount, DEFAULT_MAX_TOTAL_COUNT)/perPage)

  // обработчик выбора страницы page по клику
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={maxPageCount}
        disabled={isFetching}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  )
}
