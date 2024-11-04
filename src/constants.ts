import { TableArryaType } from "./types";

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
  
  export  const tableArray: TableArryaType[] = [
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
    },
  ]