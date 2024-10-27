import { IUserRepo } from "../models/models";
import { Response } from "../getGitHubRepositories";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';

interface TableWithSearchResults {
  visibility: boolean,
  setDopInfo(value: IUserRepo | ''): void,
  setSortClick(value: string): void,
  sortOrder: string,
  setSortOrder(value: string): void,
  repo: Response | undefined,
  isLoading: boolean
}

export function TableWithSearchResults( {visibility, setDopInfo, setSortClick, sortOrder, setSortOrder, repo, isLoading }: TableWithSearchResults) {
  // метод clickHandler, который будет принимать название репозитория, по которому был клик
  const dopInfoClickHandler = (repos: IUserRepo | '') => {
    setDopInfo(repos)
  }

  // массив, содержащий названия столбцов шапки таблицы
  const chosenSortOrder: string = (sortOrder === 'desc') ? '↓ Название' : '↑ Название'
  const tableArray: string[] = [chosenSortOrder, 'Язык', 'Число форков', 'Число звезд', 'Дата обновления']

  // функция для обработки клика: выбор фильтра и порядка сортировки
  const clickSortHandler = (selectedFilter: string) => {
    (selectedFilter === 'Число форков') ? setSortClick('forks') :
    (selectedFilter === 'Число звезд') ? setSortClick('stars') :
    (selectedFilter === 'Дата обновления') ? setSortClick('updated') :
    (selectedFilter === '↓ Название' && sortOrder === 'desc') ? setSortOrder('asc') :
    setSortOrder('desc')
  }

  // Обработка ответа от сервера: получение строки с датой
  function getReposDate (number: number) {
    const parsedDate: Date[] | undefined = repo?.items.map(item => (
      new Date(Date.parse(item.updated_at))))
    const getReposDate: string[] | undefined = parsedDate?.map(date => (
      `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    ))
    if (getReposDate) {
      return getReposDate[number]
    }
  }

  return (
    <>
    {/* если state dropdown в значении true, тогда показывать таблицу */}
    {visibility && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableArray.map(item => (
              <TableCell
                sx={{
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                  },
                }}
                align="center" // выравнивание текста
                key={item}
                onClick={() => clickSortHandler(item)}
              >{ item }</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          { isLoading && <p>Loading...</p> }
          {/* если state dropdown в значении true, тогда показывать строки в таблице TableRow */}
          {visibility && repo?.items?.map((repo, index) => (
            <TableRow
              key={repo.id}
              onClick={() => dopInfoClickHandler(repo)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: '#2196F30A',
                },
              }}
            >
              <TableCell align="center">{ repo.name }</TableCell>
              <TableCell align="center">{ repo.language }</TableCell>
              <TableCell align="center">{ repo.forks_count }</TableCell>
              <TableCell align="center">{ repo.stargazers_count }</TableCell>
              <TableCell align="center">{ getReposDate(index) }</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  )
}
