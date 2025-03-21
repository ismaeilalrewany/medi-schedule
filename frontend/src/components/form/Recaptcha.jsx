import ReCAPTCHA from 'react-google-recaptcha'

const Recaptcha = ({ setRecaptchaToken }) => {
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

  return (
    <div className="form-control pt-2">
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={(token) => setRecaptchaToken(token)}
        className="mx-auto"
      />
    </div>
  )
}

export default Recaptcha