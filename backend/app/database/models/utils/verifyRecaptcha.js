import 'dotenv/config'
import axios from 'axios'

async function verifyRecaptcha(recaptchaToken) {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
  const recaptchaResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: recaptchaSecret,
        response: recaptchaToken,
      },
    }
  )
  return recaptchaResponse.data.success
}

export default verifyRecaptcha