import React from 'react'

const Pagination = ({length, setI}) => {
  const countOFPage = Math.ceil(length / 3)
  const arrPage = new Array(countOFPage).fill(0)

  return (
    <div className="paginaton">
      Pages:
      {arrPage.map((it, ind) => {
        return (
          <button
            type="button"
            key={ind}
            onClick={() => setI(ind)}
            className="paginationButton"
          >
            {ind+1}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination