const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="container mx-auto px-2">
        <p className="">MediSchedule © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  )
}

export default Footer