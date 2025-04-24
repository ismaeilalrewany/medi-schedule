const SubmitButton = ({ name, isSubmitting, recaptchaToken }) => {
  return (
    <button
      type="submit"
      className="btn btn-neutral w-full mt-4 text-lg items-center"
      disabled={isSubmitting || !recaptchaToken}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <span>{ name }</span>
          <i class="fa-solid fa-circle-arrow-right"></i>
        </>
      )}
    </button>
  )
}

export default SubmitButton