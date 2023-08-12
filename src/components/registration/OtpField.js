import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function OtpField() {
  const [otp, setOtp] = useState('')
  const [otpErrorMsg, setOtpErrorMsg] = useState('')
  const [btnText, setBtnText] = useState('NEXT')
  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const email = useSelector((state) => state.user.email)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setServerErrorMsg('')
    setOtp(e.target.value)
    if (!e.target.value) {
      setOtpErrorMsg('Invalid otp')
    } else {
      setOtpErrorMsg('')
    }
  }

  const handleNextClick = (e) => {
    if (!otp) {
      setOtpErrorMsg('Invalid otp')
      return
    }

    setBtnText('Loading...')

    axios
      .post('http://localhost:8081/registration/verifyEmailOTP', { email, otp })
      .then((res) => {
        console.log(res.data)
        navigate('/register/password')
      })
      .catch((err) => {
        console.log(err.response.data.error)
        setBtnText('NEXT')
        if (err.response.data.error) {
          setServerErrorMsg(err.response.data.error)
        } else {
          setServerErrorMsg('Something went wrong')
        }
      })
  }

  const handleBackClick = (e) => {
    navigate('/register')
  }

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      <div className="container p-10 my-20">
        <div className="flex flex-col ">
          <div className="flex-1 w-full mx-2">
            <p className="mb-4 text-red-500">{serverErrorMsg}</p>
            <div className="h-6 mt-3 mb-3 text-xs font-bold leading-8 text-gray-500 uppercase">
              Verification
            </div>
            <p className="my-1">An OTP is sent to your email. Please enter it here.</p>
            <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={otp}
                name="OTP"
                placeholder="Enter OTP"
                autoComplete="on"
                type="text"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />
            </div>
            <p className="mb-4 text-red-500">{otpErrorMsg}</p>
            <button
              onClick={() => handleBackClick()}
              className="px-4 py-2 mt-2 mr-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-gray-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white"
            >
              Back
            </button>

            <button
              onClick={() => handleNextClick()}
              className="px-4 py-2 mt-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-blue-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white"
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
