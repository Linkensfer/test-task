import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './SelectFromDropDownList.module.scss'

interface SelectFromDropDownList {
  visibility: boolean,
  perPage: number,
  setPerPage(value: number): void
}

export function SelectFromDropDownList( {visibility, perPage, setPerPage}: SelectFromDropDownList) {
  // обработчик выбора кол-ва отрисовываемых элементов на странице
  const changePerPageHandler = (event: SelectChangeEvent) => { // при работе с типом Number было бы event: React.ChangeEvent<HTMLSelectElement>
    setPerPage(Number(event.target.value)) // преобразование к типу Число: по документации per_page - число, но по умолчанию в MUI тег <Select> работает со строками
  }

  // строковый массив выбора кол-ва отрисовываемых элементов на странице
  const perPageItemCount: string[] = ['10', '15', '20', '30', '50', '100']

  return (
    <>
      {/* если state dropdown в значении true, тогда показывать выпадающий список select */}
      {visibility && <Box className={styles.wrapper}>
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
            })
            }
          </Select>
        </FormControl>
      </Box>}
    </>
  )
}
