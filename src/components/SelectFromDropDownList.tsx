import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { perPageItemCount } from '../constants';
import styles from './SelectFromDropDownList.module.scss'

interface SelectFromDropDownListProps {
  perPage: number,
  setPerPage(value: number): void
}

export function SelectFromDropDownList( {perPage, setPerPage}: SelectFromDropDownListProps) {
  // обработчик выбора кол-ва отрисовываемых элементов на странице
  const changePerPageHandler = (event: SelectChangeEvent) => {
    setPerPage(Number(event.target.value)) // преобразование к типу Число: по документации per_page - число, но по умолчанию в MUI тег <Select> работает со строками
  }

  return (
    <Box className={styles.wrapper}>
      <h3>Rows per page:</h3>
      <FormControl variant="standard" className={styles.select}>
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
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
