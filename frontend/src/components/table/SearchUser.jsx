const SearchUser = ({ search, setSearch }) => {
  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <label className="input input-sm">
      <svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
      <input className="text-neutral" type="search" required placeholder="Search" value={search} onChange={handleChange} />
    </label>
  )
}

export default SearchUser