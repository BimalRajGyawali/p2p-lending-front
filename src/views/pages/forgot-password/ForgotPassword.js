import axios from 'axios'
import React, { useState } from 'react'
import ReactImg from 'src/assets/images/p2plogo.jpeg'
import { BeatLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [serverErrorMsg, setServerErrorMessage] = useState('')
  const [responseMsg, setResponseMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = e => {
    // TODO: Implement the password reset functionality using the entered email address
    e.preventDefault()
    setIsSubmitting(true)
    setServerErrorMessage('')
    setResponseMsg('')
    axios
      .post('http://localhost:8081/forgot-password', { email: email })
      .then(res => {
        console.log(res.data)
        setResponseMsg(res.data.message)
        setTimeout(() => {
          navigate('/path')
        }, 3000)
      })
      .catch(err => {
        if (err.response.data && err.response.data.error) {
          setServerErrorMessage(err.response.data.error)
        } else {
          setServerErrorMessage('Something went wrong')
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center px-6 my-12'>
        <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
          <div
            className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
            style={{ backgroundImage: `url(${ReactImg})` }}
          ></div>
          <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
            <div className='px-8 mb-4 text-center'>
              <h3 className='pt-4 mb-2 text-2xl'>Forgot Your Password?</h3>
              <p className='mb-4 text-sm text-gray-700'></p>
            </div>

            <form
              className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
              onSubmit={handleSubmit}
            >
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Enter Email Address...'
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting ' : 'Reset Password'}
                  {isSubmitting && <BeatLoader size={8} color='#fff' />}
                </button>
              </div>
              <hr className='mb-6 border-t' />
              <div className='text-center bg-red-500'>
                {serverErrorMsg && <div>{serverErrorMsg}</div>}
                {responseMsg && <div>{responseMsg}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
