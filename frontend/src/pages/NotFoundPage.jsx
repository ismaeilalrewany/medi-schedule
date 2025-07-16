import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="flex-grow flex items-center justify-center container mx-auto p-4">
      <div className="card w-full max-w-lg bg-white shadow-xl text-center">
        <div className="card-body p-10">
          <h1 className="text-8xl font-bold text-black">404</h1>
          <h2 className="card-title text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
          <p className="py-4 text-gray-500">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
          <div className="card-actions justify-center mt-4">
            <Link to="/" className="btn bg-black text-white normal-case text-base font-medium px-8 hover:bg-gray-800" >Go Back Home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage