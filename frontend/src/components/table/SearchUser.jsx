const SearchUser = ({ search, setSearch }) => {
  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <label className="input input-sm">
      <i className="fa-solid fa-magnifying-glass cursor-pointer opacity-50"></i>
      <input className="text-neutral" type="search" required placeholder="Search" value={search} onChange={handleChange} />
    </label>
  )
}

export default SearchUser