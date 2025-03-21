const SubmitButton = ({ isSubmitting, recaptchaToken }) => {
  return (
    <button
      type="submit"
      className="btn btn-[--color-neutral] w-full mt-4 text-lg"
      disabled={isSubmitting || !recaptchaToken}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </>
      )}
    </button>
  )
}

export default SubmitButton