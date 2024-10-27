import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUserRepo, ServerResponse } from './models/models'

export type Response = {
  items: IUserRepo[],
  totalCount: number
}

export const getGitHubRepositories = createApi({
  reducerPath: 'github/api', // первый обязательный ключ reducerPath - это строчка, которая говорит, по какому адресу в store будут храниться все необходимые закэшированные данные при работе с API
  baseQuery: fetchBaseQuery({ // второй обязательный ключ: инициализация параметра baseQuery с помощью функции fetchBaseQuery
    baseUrl:'https://api.github.com/'  // в функцию fetchBaseQuery передаётся объект, у которого должен быть параметр baseUrl; то есть для всей API прописывается базовый URL, с помощью которого потом будет конкатинироваться полный endpoints, по которому потом будет делаться запрос
  }),
  refetchOnFocus: true, // для обновления данных на странице в случае, если фокусом пользователь вновь на неё вернулся спустя какое-то время
  endpoints: build => ({ // третий обязательный ключ endpoints - это функция, которая принимает параметр build; в ней нужно вернуть объект, где будут перечислены все необходимые endpoints
    searchRepositories: build.query<Response, {search: string, page: number, per_page: number, sort: string, order: string}>({ // указания названия endpoint, например, searchRepositories - это ключ объекта (в данном случае для получения репозиториев пользователей); запрос формируется с помощью объекта build; у build есть 2 метода: query - для выполнения запроса, получения данных, и mutation - для изменения данных; в query передаётся объект, в котором описывается сам запрос; Типизация: первый дженерик - то, что получается в ответе от сервера; второй - какой параметр принимается для осуществления запроса (в данном случае это search: string)
      query: ({search, page, per_page, sort, order}) => ({
        url: `search/repositories`, // эта строчка (для поиска репозиториев) конкатинируется с baseUrl
        params: { // указание дополнительных параметров
          q: search, // search указан как параметр в качестве запроса; для GitHub API нужно свойство q, в котором указывается непосредственно search
          per_page: per_page, // указание количества параметров, которое прилетает с сервера, с помощью свойства per_page для GitHub API (см. документацию на API)
          page: page,
          sort: sort,
          order: order
        }
      }),
      transformResponse: (response: ServerResponse<IUserRepo>) => { // использование свойства transformResponse сразу после query для трансформации данных из ответа: в данном случае чтобы убрать корневой уровень с различными данными (например, total_count: number и incomplete_results: boolean) и оставить только items; при этом нужно указать тип для searchRepositories: build.query<IUserRepo[], string>, потому что он поменялся из-за изменения ответа с сервера
        return {
          items: response.items,
          totalCount: response.total_count
        }
      }
    })
  })

})

export const {useSearchRepositoriesQuery} = getGitHubRepositories // специальный кастомный хук useSearchRepositoriesQuery генерируется автоматически в зависимости от того, что указано в endpoints (в данном случае searchRepositories), то есть в названии use добавляется вначало и Query - в конце; если бы это был не query а mutation, то хук назывался бы аналогично только в конце было бы написано useSearchRepositoriesMutation
