import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import userSlice from '../../slices/userSlice'

export default function PasswordField() {
  const email = useSelector((state) => state.user.email)
  const role = useSelector((state) => state.user.role)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [btnText, setBtnText] = useState('NEXT')

  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setServerErrorMsg('')

    if (confirmPassword && confirmPassword !== e.target.value) {
      setPasswordErrorMsg('Passwords did not match')
    } else {
      setPasswordErrorMsg('')
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setServerErrorMsg('')

    if (password !== e.target.value) {
      setPasswordErrorMsg('Passwords did not match')
    } else {
      setPasswordErrorMsg('')
    }
  }

  const handleBackClick = (e) => {
    navigate('/register/otp')
  }

  const handleNextClick = (e) => {
    if (passwordErrorMsg) {
      return
    }
    if (!password || !confirmPassword) {
      setPasswordErrorMsg('Invalid password')
      return
    }
    if (password !== confirmPassword) {
      setPasswordErrorMsg('Passwords did not match')
      return
    }

    const URL =
      role === 'BORROWER'
        ? 'http://localhost:8081/registration/createBorrower'
        : 'http://localhost:8081/registration/createLender'

    axios
      .post(URL, { email, password })
      .then((res) => {
        console.log(res.data)
        dispatch(userSlice.actions.setEmail(''))
        dispatch(userSlice.actions.setRole(''))
        navigate('/login')
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

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      <div className="container p-10 my-20">
        <div className="flex flex-col ">
          <div className="flex-1 w-full mx-2">
            <p>OTP verified successfully. Now, set a password !</p>
            <p className="mb-4 text-red-500">{serverErrorMsg}</p>
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
              Set Password
            </div>
            <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
              <input
                onChange={handlePasswordChange}
                value={password}
                name="password"
                placeholder="Password"
                type="password"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />
            </div>
          </div>
          <div className="flex-1 w-full mx-2">
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
              Retype Password
            </div>
            <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                name="confirmPassword"
                placeholder="Password"
                type="password"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />
            </div>

            <p className="mb-4 text-red-500">{passwordErrorMsg}</p>

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
