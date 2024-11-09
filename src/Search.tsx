import { useEffect, useState } from "react";
import { useSearchRepositoriesQuery } from "./getGitHubRepositories";
import { useDebounce } from "./hooks/debounce";
import { IUserRepo } from "./models/models";
import { AppBarForSearch } from "./components/AppBarForSearch"; 
import { Greetings } from "./components/Greetings";
import { TableWithSearchResults } from "./components/TableWithSearchResults";
import { SelectFromDropDownList } from "./components/SelectFromDropDownList";
import { PaginationOfServerResponse } from "./components/PaginationOfServerResponse";
import { DopInfo } from "./components/DopInfo";
import { ColumnName, OrderName } from "./constants";
import styles from './Search.module.scss'

export function Search() {
  const [page, setPage] = useState<number>(1)  // state для пагинации (хранения состояния текущей страницы)
  const [perPage, setPerPage] = useState<number>(10) // state для пагинации (выбора количества отрисовываемых на странице элементов)

  const [sortClick, setSortClick] = useState<ColumnName>(ColumnName.Name) // state для выбора фильтра (по какому фильтру сортировать)
  const [sortOrder, setSortOrder] = useState<OrderName>(OrderName.Desc) // state для порядка сортировка (по возрастания/по убыванию; по умолчанию - по убыванию)

  const [search, setSearch] = useState('') // state для input
  const [dropdown, setDropdown] = useState(false) // state для видимости (скрытия) списка рерозиториев при поиске в input, чтобы после набора запроса и его последующего удаления список больше не показывался

  const debounced = useDebounce(search) // search передаётся в качестве зависимости для данного хука

  const [dopInfo, setDopInfo] = useState<IUserRepo | null>( null ) // state для отрисовки дополнительной информации о репозитории

  // использование кастомного хука
  const {isLoading, isError, data: repo, isFetching} = useSearchRepositoriesQuery({ // data: repo - это переименование параметра data в repo с помощью синтаксиса с двуеточием в TS
    search: debounced, // в качестве зависимости передаётся state debounced, чтобы делать запрос каждый раз, когда параметр debounced изменился; хук useSearchRepositoriesQuery делате запрос сразу же как только компонент инициализируется
    page: page,
    per_page: perPage,
    sort: sortClick,
    order: sortOrder},
    {
      skip: debounced.length < 3, // вторым параметром в кастомный хук useSearchRepositoriesQuery можно передать объект со свойством skip (при каком условии не нужно делать запрос): если длина запроса (то есть состояние debounced) менее заданного количества символом, то запрос не выполняется
      refetchOnFocus: true } // в случае, если пользователь вернулся фокусом на данную страницу, то нужно автоматически сделать запрос; это осуществляется через этот флаг; возможна ситуация, когда пользователь открыл вкладку, загрузил данные и ушёл на другую вкладку браузера, на другой сайт, и вернулся только спустя час или день, тогда будут видны старые данные давно не обновлявшиеся и нужно обновить страницу; но нужно настроить этот флаг: см. файл index.ts (setupListeners) и файл getGitHubRepositories (refetchOnFocus)
  )

  useEffect( () => {
    setDropdown(debounced.length > 3 && repo?.items?.length! > 0 ) // условие, по которому будет меняться видимость выпадающего списка: если в debounced есть строчка, где больше 3 символов, и в data что-то присутствует
    if (debounced.length < 3) {setDopInfo(null)} // очистка доп. информации dopInfo о выбранном репозитории, если кол-во символов в строке запроса менее 3 (чтобы при очистке запроса и последующем запросе не видеть старую информацию о выбранном до этого репозитории)
  }, [debounced, repo])

  return (
    <>
      <div>
        { isError && <p>Somthing went wrong...</p>}
      </div>

      <AppBarForSearch
        inputText={search}
        setInputText={setSearch}
      />

      <Greetings
        visibility={dropdown}
      />

      {/* если state dropdown в значении true, тогда показывать таблицу, выпадающий список select, пагинацию */}
      {dropdown && <div className={styles.wrapper}>

        {/* контейнер Box для хранения таблицы, выпадающего списка select и пагинации */}
        <div className={styles.search}>

          <TableWithSearchResults
            setDopInfo={setDopInfo}
            sortClick={sortClick}
            setSortClick={setSortClick}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            repo={repo}
            isLoading={isLoading}
          />

          <div className={styles.pagination}>
            <SelectFromDropDownList
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <PaginationOfServerResponse
              repo={repo}
              isFetching={isFetching}
              perPage={perPage}
              setPage={setPage}
            />

          </div>
        </div>

        <DopInfo
          dopInfo={dopInfo}
        />

      </div>}
    </>
  )
}
