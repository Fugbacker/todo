import React from 'react'

const SortButton = ({sort, setTodo, todo, setSorter, sorter}) => {
  return (
    <button
      type="button"
      className="sortButton"
      onClick={() => {
        setSorter(sorter === 1 ? -1 : 1)
        const newResult = todo.sort((a, b) => {
          const nameA = JSON.stringify(a[sort]).toLowerCase()
          const nameB = JSON.stringify(b[sort]).toLowerCase()
          if (nameA < nameB) {return sorter}
          if (nameA > nameB) {return -sorter}
          return 0
        })
        setTodo(newResult)
      }}
    >
      {sort}
    </button>
  )
}

export default SortButton