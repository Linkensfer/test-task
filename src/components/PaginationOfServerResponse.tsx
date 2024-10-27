import { Response } from "../getGitHubRepositories";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationOfServerResponse {
  repo: Response | undefined,
  visibility: boolean,
  isFetching: boolean,
  perPage: number,
  setPage(value: number): void
}

export function PaginationOfServerResponse( {repo, visibility, isFetching, perPage, setPage}: PaginationOfServerResponse) {
    // получения максимального кол-ва страниц при поиске
    const totalCount = repo?.totalCount
    const maxPageCount = totalCount && Math.ceil(totalCount/perPage)

    // обработчик выбора страницы page по клику
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    }

  return (
    <>
      {/* если state dropdown в значении true, тогда показывать пагинацию */}
      {visibility && <Stack spacing={2}>
      <Pagination
        count={maxPageCount}
        disabled={isFetching}
        color="primary"
        onChange={handleChange}
      />
      </Stack>}
    </>
  )
}
