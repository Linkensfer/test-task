import React from 'react';

// импорты для Drawer
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Drawer
// type Anchor = 'top' | 'left' | 'bottom' | 'right';

// const [state, setState] = React.useState({
//   top: false,
//   left: false,
//   bottom: false,
//   right: false,
// });

// const toggleDrawer =
// (anchor: Anchor, open: boolean) =>
// (event: React.KeyboardEvent | React.MouseEvent) => {
//   // if (
//   //   event.type === 'keydown' &&
//   //   ((event as React.KeyboardEvent).key === 'Tab' ||
//   //     (event as React.KeyboardEvent).key === 'Shift')
//   // ) {
//   //   return;
//   // }

//   setState({ ...state, [anchor]: open });
// };

// const list = (anchor: Anchor) => (
//   <Box
//     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }} // регулирование ширины Drawer
//     role="presentation"
//     // onClick={toggleDrawer(anchor, false)} // скрыть Drawer при клике по нему
//     // onKeyDown={toggleDrawer(anchor, false)}
//   >
//     {dopInfo && <div>
//       <RepoCard 
//         repo={dopInfo}
//       />
//     </div>}
//   </Box>
// );

      {/*исходный код MUI*/}
      {/*AppBar и InputBase*/}
      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="GitHub Search Repositories..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Button variant="contained">Contained</Button>
          </Toolbar>
        </AppBar>
      </Box> */}

      {/*исходный код MUI*/}
      {/*Table*/}
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/*исходный код MUI*/}
      {/*Drawer*/}
      // {dropdown && <div>
      //   {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
      //     <React.Fragment key={anchor}>
      //       <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
      //       <Drawer
      //         anchor={anchor}
      //         open={state[anchor]}
      //         onClose={toggleDrawer(anchor, false)}
      //       >
      //         {list(anchor)}
      //       </Drawer>
      //     </React.Fragment>
      //   ))}
      // </div>}

      {/*исходный код MUI*/}
      {/*Pagination*/}
      {/* <Stack spacing={2}>
        <Pagination count={10} />
        <Pagination count={10} color="primary" />
        <Pagination count={10} color="secondary" />
        <Pagination count={10} disabled />
      </Stack> */}

      {/*исходный код MUI*/}
      {/*Select*/}
      {/* <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={select}
          onChange={selectChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={select}
          onChange={selectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div> */}

      {/*исходный код MUI*/}
      {/*Chip*/}
      // <Stack direction="row" spacing={1}>
      //   <Chip label="Chip Filled" />
      //   <Chip label="Chip Outlined" variant="outlined" />
      // </Stack>

      {/*исходный код MUI*/}
      {/*Grid v2*/}
      // const Item = styled(Paper)(({ theme }) => ({
      //   backgroundColor: '#fff',
      //   ...theme.typography.body2,
      //   padding: theme.spacing(2),
      //   textAlign: 'center',
      //   color: theme.palette.text.secondary,
      //   ...theme.applyStyles('dark', {
      //     backgroundColor: '#1A2027',
      //   }),
      // }));
      // export default function ResponsiveGrid() {
      //   return (
      //     <Box sx={{ flexGrow: 1 }}>
      //       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      //         {Array.from(Array(6)).map((_, index) => (
      //           <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
      //             <Item>{index + 1}</Item>
      //           </Grid>
      //         ))}
      //       </Grid>
      //     </Box>
      //   );
      // }
