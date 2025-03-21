import ReCAPTCHA from 'react-google-recaptcha'

const Recaptcha = ({ setRecaptchaToken }) => {
  return (
    <div className="form-control pt-2">
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={(token) => setRecaptchaToken(token)}
        className="mx-auto"
      />
    </div>
  )
}

export default Recaptcha