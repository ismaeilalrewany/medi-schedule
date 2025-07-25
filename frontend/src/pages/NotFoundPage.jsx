import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="bg-gradient-to-br from-base-200 to-base-100">
      <div className="container mx-auto px-2">
        <section className="flex justify-center items-center h-screen">
          <article className="card w-full max-w-lg bg-white shadow-lg text-center">
            <div className="card-body p-10 flex flex-col items-center">
              <h1 className="text-8xl font-semibold text-neutral">404</h1>
              <h2 className="card-title text-3xl font-semibold mt-4 text-neutral/80">
                Page Not Found
              </h2>
              <p className="py-4 text-neutral/60">
                Oops! The page you are looking for does not exist. It might have been moved or
                deleted.
              </p>
              <div className="card-actions justify-center mt-4">
                <Link
                  to="/"
                  className="btn bg-neutral text-neutral-content normal-case text-base font-medium px-8 border-0"
                >
                  Go Back Home
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}

export default NotFoundPage
