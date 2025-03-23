// import { useEffect, useState } from 'react'
import { useState } from 'react'
import axios from 'axios'
import TextInput from '../components/form/TextInput.jsx'
import EmailInput from '../components/form/EmailInput.jsx'
import PasswordInput from '../components/form/PasswordInput.jsx'
import RadioInput from '../components/form/RadioInput.jsx'
import TextareaInput from '../components/form/TextareaInput.jsx'
import TelInput from '../components/form/TelInput.jsx'
import DateInput from '../components/form/DateInput.jsx'
import Recaptcha from '../components/form/Recaptcha.jsx'
import SubmitButton from '../components/form/SubmitButton.jsx'
import RedirectLink from '../components/form/RedirectLink.jsx'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PatientRegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('male')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [token, setToken] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/patients/register`,
        {
          fullName,
          email,
          password,
          phoneNumber,
          dateOfBirth,
          gender: gender.toLowerCase(),
          medicalHistory,
          recaptchaToken,
        },
        {
          withCredentials: true, 
          headers: { 'Content-Type': 'application/json' }
        }
      )

      // setToken(response.data.token)

      console.log('Registration successful:', response.data)
      navigate('/patients/appointments')
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manually set cookie for server domain
  // useEffect(() => {
  //   Cookies.set('token', token, 
  //     { expires: 7, 
  //       domain: new URL(import.meta.env.VITE_API_URL).hostname, 
  //       secure: import.meta.env.VITE_API_URL.startsWith('https'), 
  //       sameSite: 'lax' 
  //     }
  //   )
  // }, [token])

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-4">
      <div className="card min-w-88 max-w-96 shadow-2xl bg-base-100">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral" style={{ fontFamily: 'Cursive, sans-serif' }}>Welcome!</h1>
            <p className="text-neutral mt-2">Please register to continue</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Full Name" value={fullName} setValue={setFullName} placeholder="John Doe" />
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <TelInput value={phoneNumber} setValue={setPhoneNumber} placeholder="+1 234 567 890" />
            <DateInput label="Date of Birth" value={dateOfBirth} setValue={setDateOfBirth} />
            <RadioInput name="Gender" options={['Male', 'Female']} checked={gender} setChecked={setGender} />
            <TextareaInput label="Medical History" value={medicalHistory} setValue={setMedicalHistory} placeholder="Any past medical conditions..." />
            <Recaptcha setRecaptchaToken={setRecaptchaToken} />
            <SubmitButton name="Register" isSubmitting={isSubmitting} recaptchaToken={recaptchaToken} />
            <RedirectLink text="Already have an account? " path="/login" linkText="Login" />
          </form>
        </div>
      </div>
    </main>
  )
}

export default PatientRegisterPage