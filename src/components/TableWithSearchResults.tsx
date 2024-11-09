import { IUserRepo } from "../models/models";
import { Response } from "../getGitHubRepositories";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './TableWithSearchResults.module.scss'
import { ColumnName, OrderName, OrderSymbols, tableArray } from "../constants";

interface TableWithSearchResultsProps {
  setDopInfo(value: IUserRepo | null): void
  sortClick: ColumnName
  setSortClick(value: ColumnName): void
  sortOrder: OrderName
  setSortOrder(value: OrderName): void
  repo: Response | undefined
  isLoading: boolean
}

export function TableWithSearchResults( {setDopInfo, sortClick, setSortClick, sortOrder, setSortOrder, repo, isLoading }: TableWithSearchResultsProps) {
  // метод clickHandler, который будет принимать название репозитория, по которому был клик
  const dopInfoClickHandler = (repos: IUserRepo | null) => {
    setDopInfo(repos)
  }

  // функция для обработки клика: выбор фильтра и порядка сортировки
  const clickSortHandler = (selectedFilter: ColumnName) => {
    // если колонка для сортировки неактивная, то устанавливается название сортировки и порядок - desc
    if (selectedFilter !== sortClick) {
      setSortClick(selectedFilter)
      setSortOrder(OrderName.Desc)
      return
    }

    // иначе меняется порядок
    const chosenSortOrder: OrderName = sortOrder === OrderName.Desc ? OrderName.Asc : OrderName.Desc
    setSortOrder(chosenSortOrder)
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
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableArray.map(item => {
              const orderSymbol = item.id === sortClick ? OrderSymbols[sortOrder] : ''
              const titleName = `${orderSymbol} ${item.name}`
              return (
              <TableCell
                className={styles.tableHeadRow}
                key={item.id}
                onClick={() => clickSortHandler(item.id)}
              >
                { titleName }
              </TableCell>)
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          { isLoading && <p>Loading...</p> }
          {repo?.items?.map((repo, index) => (
            <TableRow
              key={repo.id}
              onClick={() => dopInfoClickHandler(repo)}
              className={styles.tableBodyRow}
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
    </TableContainer>
  )
}
