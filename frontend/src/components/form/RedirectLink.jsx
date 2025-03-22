// import { Link } from 'react-router-dom'

const RedirectLink = ({ text, linkText, path }) => {
  return (
    <p className="text-sm text-neutral text-center">
      <span className="pointer-events-none">{ text }</span>
      {/* <Link to={path} className="link text-neutral underline">{ linkText }</Link> */}
      <a to={path} className="link text-neutral underline">{ linkText }</a>
    </p>
  )
}

export default RedirectLink