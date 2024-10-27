import { configureStore } from "@reduxjs/toolkit";
import { getGitHubRepositories } from "../getGitHubRepositories";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [getGitHubRepositories.reducerPath]: getGitHubRepositories.reducer // регистрация API getGitHubRepositories; соединение API со store; создание ключа [getGitHubRepositories.reducerPath] - то есть это название reducerPath, прописанное в данном API, - это ключ, в котором будут храниться все данные в redux, связанные с данной API; в качестве значения ключа указывается getGitHubRepositories.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(getGitHubRepositories.middleware) // устранение ERROR: добавление middleware, который позволяет работать с кэшем, автоматическими рефрешами и т.д.; указывается параметр middleware с методом getDefaultMiddleware, который возвращает вызов этого метода getDefaultMiddleware() (получается массив) и после этого вызов конкатинируется с middleware, который предоставляется самой API GitHub (то есть getGitHubRepositories), записывается как .concat(getGitHubRepositories.middleware)
})

setupListeners(store.dispatch) // для обновления данных на странице в случае, если фокусом пользователь вновь на неё вернулся спустя какое-то время
