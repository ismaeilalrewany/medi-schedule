const Pagination = ({ data, setPage }) => {
  const { currentPage, itemsPerPage, totalItems, totalPages } = data
  const pagesLeft = totalPages - currentPage

  const nextPage = () => {
    if (currentPage < totalPages && pagesLeft > 0) {
      setPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1)
    }
  }

  return (
    <div className="join text-neutral">
      <button className="join-item btn btn-sm" onClick={prevPage}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button className="join-item btn btn-sm pointer-events-none">Page {currentPage}</button>
      <button className="join-item btn btn-sm" onClick={nextPage}>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  )
}

export default Pagination