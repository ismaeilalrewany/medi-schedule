import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/form/TextInput.jsx'
import EmailInput from '../components/form/EmailInput.jsx'
import PasswordInput from '../components/form/PasswordInput.jsx'
import TelInput from '../components/form/TelInput.jsx'
import RadioInput from '../components/form/RadioInput.jsx'
import QualificationsInput from '../components/form/QualificationsInput.jsx'
import AvailableTimeSlots from '../components/form/AvailableTimeSlots.jsx'
import Recaptcha from '../components/form/Recaptcha.jsx'
import SubmitButton from '../components/form/SubmitButton.jsx'
import RedirectLink from '../components/form/RedirectLink.jsx'

const DoctorRegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [qualifications, setQualifications] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('male')
  const [timeSlots, setTimeSlots] = useState([])
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/doctors/register`, {
        fullName: fullName.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        specialization: specialization.trim(),
        qualifications: qualifications.map(q => q.trim()),
        phoneNumber: phoneNumber.trim(),
        gender: gender.toLowerCase(),
        availableTimeSlots: timeSlots,
        recaptchaToken
      }, {
        withCredentials: true,
      })

      navigate('/admins/dashboard')
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message)
      // Reset reCAPTCHA on error
      setRecaptchaToken(null)
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8">
      <div className="card min-w-88 max-w-96 w-full shadow ring-1 ring-neutral-300 bg-base-100">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral" style={{ fontFamily: 'Cursive, sans-serif' }}>Welcome Doctor!</h1>
            <p className="text-neutral mt-2">Please fill in your professional details</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Full Name" value={fullName} setValue={setFullName} placeholder="Dr. John Doe" />
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <TextInput label="Specialization" value={specialization} setValue={setSpecialization} placeholder="Cardiology" />
            <QualificationsInput qualifications={qualifications} setQualifications={setQualifications} />
            <TelInput value={phoneNumber} setValue={setPhoneNumber} placeholder="+1 234 567 890" />
            <RadioInput name={'Gender'} options={['Male', 'Female']} checked={gender} setChecked={setGender} />
            <AvailableTimeSlots timeSlots={timeSlots} setTimeSlots={setTimeSlots} />
            <Recaptcha setRecaptchaToken={setRecaptchaToken} recaptchaRef={recaptchaRef} />
            <SubmitButton name={'Register'} isSubmitting={isSubmitting} recaptchaToken={recaptchaToken} />
            <RedirectLink text={`Already have an account? `} linkText={`Login`} path={`/login`} />
          </form>
        </div>
      </div>
    </main>
  )
}

export default DoctorRegisterPage