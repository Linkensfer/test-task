import { useEffect, useState } from "react";
import { useSearchRepositoriesQuery } from "../getGitHubRepositories";
import { useDebounce } from "../hooks/debounce";
import { RepoCard } from "../components/RepoCard";
import { IUserRepo } from "../models/models";
import { AppBarForSearch } from "../components/AppBarForSearch"; 
import { Greetings } from "../components/Greetings";
import { TableWithSearchResults } from "../components/TableWithSearchResults";
import { SelectFromDropDownList } from "../components/SelectFromDropDownList";
import { PaginationOfServerResponse } from "../components/PaginationOfServerResponse";
import { DopInfo } from "../components/DopInfo"; 

// импорты для AppBar и InputBase
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// импорт для кнопки
import Button from '@mui/material/Button';

// импорты для таблицы
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';

// импорты для выпадающего списка select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// импорты для пагинации
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function Search() {
  const [page, setPage] = useState<number>(1)  // state для пагинации (хранения состояния текущей страницы)
  const [perPage, setPerPage] = useState<number>(10) // state для пагинации (выбора количества отрисовываемых на странице элементов)

  const [sortClick, setSortClick] = useState('none') // state для выбора фильтра (по какому фильтру сортировать)
  const [sortOrder, setSortOrder] = useState('desc') // state для порядка сортировка (по возрастания/по убыванию; по умолчанию - по убыванию)

  const [search, setSearch] = useState('') // state для input
  const [dropdown, setDropdown] = useState(false) // state для видимости (скрытия) списка рерозиториев при поиске в input, чтобы после набора запроса и его последующего удаления список больше не показывался

  const debounced = useDebounce(search) // search передаётся в качестве зависимости для данного хука

  const [searchForButton, setSearchForButton] = useState('') // state для button
  // const changeSearchForButtonHandler = (e:  React.MouseEvent<HTMLSelectElement>) => setSearchForButton(e.target.value)
  
  const [dopInfo, setDopInfo] = useState<IUserRepo | ''>('') // state для отрисовки дополнительной информации о репозитории

  // использование кастомного хука
  const {isLoading, isError, data: repo, isFetching} = useSearchRepositoriesQuery({ // data: repo - это переименование параметра data в repo с помощью синтаксиса с двуеточием в TS
    search: debounced, // в качестве зависимости передаётся state debounced, чтобы делать запрос каждый раз, когда параметр debounced изменился; хук useSearchRepositoriesQuery делате запрос сразу же как только компонент инициализируется;
    page: page,
    per_page: perPage,
    sort: sortClick,
    order: sortOrder},
    {
      skip: debounced.length < 3, // вторым параметром в кастомный хук useSearchRepositoriesQuery можно передать объект со свойством skip (при каком условии не нужно делать запрос): если длина запроса (то есть состояние debounced) менее заданного количества символом, то запрос не выполняется
      refetchOnFocus: true } // в случае, если пользователь вернулся фокусом на данную страницу, то нужно автоматически сделать запрос; это осуществляется через этот флаг; возможна ситуация, когда пользователь открыл вкладку, загрузил данные и ушёл на другую вкладку браузера, на другой сайт, и вернулся только спустя час или день, тогда будут видны старые данные давно не обновлявшиеся и нужно обновить страницу; но нужно настроить этот флаг: см. файл index.ts (setupListeners) и файл getGitHubRepositories (refetchOnFocus)
  )

  useEffect( () => {
    setDropdown(debounced.length > 3 && repo?.items?.length! > 0 ) // условие, по которому будет меняться видимость выпадающего списка: если в debounced есть строчка, где больше 3 символов, и в data что-то присутствует; repo?.length! - здесь ? (необязательное поле) и ! (обязательное поле) для того чтобы TS не ругался
    if (debounced.length < 3) {setDopInfo('')} // очистка доп. информации dopInfo о выбранном репозитории, если кол-во символов в строке запроса менее 3 (чтобы при очистке запроса и последующем запросе не видеть старую информацию о выбранном до этого репозитории)
    // console.log(debounced)
    // console.log(search)
  }, [debounced, repo])

  // AppBar и InputBase
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius, // скругления по углам прямоугольника
    backgroundColor: alpha(theme.palette.common.white, 0.15), // цвета фона строки поиска
    '&:hover': { // изменение цвета фона строки поиска при наведении курсора
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { // растягивание на всю страницу строки поиска
      marginLeft: theme.spacing(1), // отступ слева для строки поиска
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2), // позиционизрование иконки отступами: сверху-снихзу, справа-слева
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit', // цвет дефолтного текста строки поиска
    width: '100%', // исходная ширина строки поиска
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 10), // отступы: сверху, справа, снизу, слева
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '26ch', // исходная ширина строки поиска
        '&:focus': {
          width: '34ch',  // ширина строки поиска при наведении на неё
        },
      },
    },
  }));

  // Table
  // метод clickHandler, который будет принимать название репозитория, по которому был клик
  const dopInfoClickHandler = (repos: IUserRepo | '') => {
    console.log(repos)
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

  // Pagination, Select
  // получения максимального кол-ва страниц при поиске
  const totalCount = repo?.totalCount
  console.log(totalCount)
  const maxPageCount = totalCount && Math.ceil(totalCount/perPage)

  // обработчик выбора кол-ва отрисовываемых элементов на странице
  const changePerPageHandler = (event: SelectChangeEvent) => { // при работе с типом Number было бы event: React.ChangeEvent<HTMLSelectElement>
    setPerPage(Number(event.target.value)) // преобразование к типу Число: по документации per_page - число, но умолчанию в MUI тег <Select> работает со строками
  }

  // строковый массив выбора кол-ва отрисовываемых элементов на странице
  const perPageItemCount: string[] = ['10', '15', '20', '30', '50', '100']

  // обработчик выбора страницы page по клику
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return (
    <>
      <div>
        { isError && <p>Somthing went wrong...</p>}
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="GitHub Search Repositories..."
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Search>
            {/* <Button variant="contained" sx={{ marginLeft: 2 }}>ИСКАТЬ</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      {dropdown ? <h1>Результаты поиска</h1> :
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: '100vh' }}>
          <Typography variant='h2'
            sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
            Добро пожаловать
          </Typography>
        </Box>
      }

      {/* контейнер Box для хранения двух Box со свойством display: "flex" */}
      {dropdown && <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: '85vh'
        }}>

        {/* контейнер Box для хранения таблицы, выпадающего списка select и пагинации */}
        <Box
          sx={{ width: '75%', minHeight: '85vh', }}>

          {/* если state dropdown в значении true, тогда показывать таблицу */}
          {dropdown && <TableContainer component={Paper}>
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
                {dropdown && repo?.items?.map((repo, index) => (
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

          <Box sx={{
            display: "flex",
            justifyContent: "end",
            paddingTop: 2,
            position: 'inherit',
            bottom: 0,
            }}
            component="footer">
            {/* если state dropdown в значении true, тогда показывать выпадающий список select */}
            {dropdown && <Box sx={{ display: "flex", justifyContent: "left"}}>
              <h3>Rows per page:</h3>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">Elements on the page</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={String(perPage)}
                  onChange={changePerPageHandler}
                  label="Elements on the page"
                >
                  {perPageItemCount.map(item => {
                    return <MenuItem value={item} key={item}>{item}</MenuItem>
                  })
                  }
                </Select>
              </FormControl>
              <footer>TEST FOOTER</footer>
            </Box>}

            {/* если state dropdown в значении true, тогда показывать пагинацию */}
            {dropdown && <Stack spacing={2}>
              <Pagination
                count={maxPageCount}
                disabled={isFetching}
                color="primary"
                onChange={handleChange}
              />
            </Stack>}
          </Box>
        </Box>

        {/* контейнер Box для доп. информации о репозитории */}
        {dropdown && !dopInfo ? <Box
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
          {dopInfo && dropdown && <div>
            <RepoCard 
              repo={dopInfo}
            />
          </div>}
        </Box>}
      </Box>}
    </>
  )
}
