import React from 'react';

{/* если state dropdown в значении true, тогда показывать Drawer*/}
// {dropdown && <div>
//   {(['right'] as const).map((anchor) => (
//     <React.Fragment key={anchor}>
//       {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
//       {dopInfo && <Drawer // если state dopInfo в значении true, тогда показывать Drawer
//         anchor={anchor}
//         // open={state[anchor]} // исходная логика
//         open={dropdown && state[anchor]} //!!!!
//         onClose={toggleDrawer(anchor, false)}
//       >
//         {list(anchor)}
//       </Drawer>}
//     </React.Fragment>
//   ))}
// </div>}

<>
  {/* исходный код без вёрстки */}
  {/* <input
    type="text"
    placeholder="GitHub Search Repositories"
    value={search}
    onChange={e => setSearch(e.target.value)}
  /> */}

  {/* <button
    // onClick={changeHandler}
  >
    ИСКАТЬ
  </button> */}

  {/*исходный код без вёрстки*/}
  {/* {tableArray.map(item => (
    <div
      key={item}
      onClick={() => clickSortHandler(item)}
    >{ item }</div>
  ))} */}

  {/*исходный код без вёрстки*/}
  {/* если state dropdown в значении true, тогда показывать ul список */}
  {/* {dropdown && <ul> 
    { isLoading && <p>Loading...</p>}
    { repo?.items?.map(repo => (
      <li
        key={repo.id}
        onClick={() => clickHandler(repo)}
      >{ repo.name } { repo.language } { repo.forks_count } { repo.stargazers_count } { repo.updated_at }</li>
    )) }
  </ul>} */}

  {/*если dopInfo не равен пустой строке, то есть true, тогда отрисовывать компонент RepoCard, в который прокидывается один объект, по которому кликнул пользователь*/}
  {/*исходный код без вёрстки*/}
  {/* {dopInfo && <div>
    <RepoCard 
      repo={dopInfo}
    />
  </div>} */}

  {/*исходный код без вёрстки*/}
  {/* {dropdown && <div>
    <h3>Rows per page:</h3>
    <select
      value={perPage}
      onChange={changePerPageHandler}>
      {perPageItemCount.map(item => {
        return <option>{item}</option>
      })
      }
    </select>
  </div>} */}
  {/*если maxPageCount true, тогда выводить пагинацию*/}
  {/* {maxPageCount && `1-${page} of ${maxPageCount}`} 

  <button
    onClick={() => {
      if (page !== 1) {setPage(page - 1)}
    }}
    disabled={isFetching}
  >
    {'<'}
  </button>

  <button
    onClick={() => {
      if (maxPageCount && (page < maxPageCount)) { setPage(page + 1) }
    }}
    disabled={isFetching}
  >
    {'>'}
  </button> */}
</>
