import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import userSlice from '../../slices/userSlice'
import { CFormCheck } from "@coreui/react";

export default function EmailField() {
  const storedEmail = useSelector((state) => state.user.email || '')
  const storedRole = useSelector((state) => state.user.role || '')
  const [email, setEmail] = useState(storedEmail)
  const [role, setRole] = useState(storedRole)
  const [btnText, setBtnText] = useState('NEXT')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [roleErrorMsg, setRoleErrorMsg] = useState('')
  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const dispatch = useDispatch()

  const isEmailValid = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (!isEmailValid(e.target.value)) {
      setEmailErrorMsg('Please enter a valid email')
    } else {
      setEmailErrorMsg('')
    }
  }

  const handleRoleChange = (e) => {
    setRoleErrorMsg('')
    setRole(e.target.value)
  }

  const handleNextClick = (e) => {
    if (!isEmailValid(email)) {
      setEmailErrorMsg('Please enter a valid email')
      return
    }
    if (!role) {
      setRoleErrorMsg('Please select a role')
      return
    }

    setBtnText('Loading...')
    console.log('Loading')
    dispatch(userSlice.actions.setEmail(email))
        dispatch(userSlice.actions.setRole(role))
    navigate('/register/otp')

      // axios
      //   .post('http://localhost:8081/api/v1/sendEmailOTP', { email })
      //   .then((res) => {
      //     console.log(res.data)
      //     dispatch(userSlice.actions.setEmail(email))
      //     dispatch(userSlice.actions.setRole(role))
      //     navigate('/register/otp')
      //   })
      //   .catch((err) => {
      //     setBtnText('NEXT')
      //     if (err.response.data && err.response.data.error) {
      //       setServerErrorMsg(err.response.data.error)
      //     } else {
      //       setServerErrorMsg('Something went wrong')
      //     }
      //   })
  }

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      <div className="container p-10 my-20">
        <div className="flex flex-col ">
          <div className="flex-1 w-full mx-2">
            <p className="mb-4 text-red-500">{serverErrorMsg}</p>

            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
              Register As
            </div>

            <CFormCheck style={{display: 'inline'}} onChange={handleRoleChange} type="radio" name="role" id="borrower" label="Borrower" value="BORROWER" defaultChecked={role === "BORROWER"}/>
            <CFormCheck style={{display: 'inline'}} onChange={handleRoleChange} type="radio" name="role" id="lender" label="Lender" value="LENDER" defaultChecked={role === "LENDER"}/>
            <p className="mt-2 mb-4 text-red-500">{roleErrorMsg}</p>

            <div className="h-6 mt-5 text-xs font-bold leading-8 text-gray-500 uppercase">
              Email Address
            </div>
            <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={email}
                name="Email Address"
                placeholder="Email Address"
                autoComplete="on"
                type="text"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />
            </div>
            <p className="mb-4 text-red-500">{emailErrorMsg}</p>
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
