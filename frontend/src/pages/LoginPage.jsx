import { useState } from 'react'
import axios from 'axios'
import EmailInput from '../components/form/EmailInput.jsx'
import PasswordInput from '../components/form/PasswordInput.jsx'
import RadioInput from '../components/form/RadioInput.jsx'
import Recaptcha from '../components/form/recaptcha.jsx'
import SubmitButton from '../components/form/SubmitButton.jsx'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        role,
        recaptchaToken
      })

      console.log('Login successful:', response.data)
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body p-8">
          <div className="text-center mb-8"></div>
          <h1 className="text-3xl font-bold text-neutral" style={{ fontFamily: 'Cursive, sans-serif' }}>Welcome Back!</h1>
          <p className="text-neutral mt-2">Please login to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          <RadioInput role={role} setRole={setRole} />
          <Recaptcha setRecaptchaToken={setRecaptchaToken} />
          <SubmitButton isSubmitting={isSubmitting} recaptchaToken={recaptchaToken} />

          <p className="text-sm text-neutral text-center">
            Don't have an account?{' '}
            <a href="#" className="link text-neutral">
              Register
            </a>
          </p>
        </form>
      </div>
    </main>
  )
}

export default LoginPage