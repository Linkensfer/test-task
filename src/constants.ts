import { TableArrayType } from "./types";

// строковый массив выбора кол-ва отрисовываемых элементов на странице
export const perPageItemCount: string[] = ['10', '15', '20', '30', '50', '100']

export enum ColumnTitle {
  Name = 'Название',
  Language = 'Язык',
  NumberForks = 'Число форков',
  NumberStars = 'Число звезд',
  DateUpdate = 'Дата обновления'
}

export enum ColumnName {
  Name = 'name',
  Language = 'language',
  NumberForks = 'forks',
  NumberStars = 'stars',
  DateUpdate = 'updated'
}

export enum OrderName {
  Asc = 'asc',
  Desc = 'desc'
}

export const OrderSymbols = {
  [OrderName.Asc]: '↑',
  [OrderName.Desc]: '↓'
}

export const tableArray: TableArrayType[] = [
  {
    name: ColumnTitle.Name,
    id: ColumnName.Name,
  },
  {
    name: ColumnTitle.Language,
    id: ColumnName.Language,
  },
  {
    name: ColumnTitle.NumberForks,
    id: ColumnName.NumberForks,
  },
  {
    name: ColumnTitle.NumberStars,
    id: ColumnName.NumberStars,
  },
  {
    name: ColumnTitle.DateUpdate,
    id: ColumnName.DateUpdate,
  }
]
