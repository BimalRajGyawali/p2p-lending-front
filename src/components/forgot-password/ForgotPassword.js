import axios from 'axios'
import React, { useState } from 'react'
import ReactImg from 'src/assets/images/p2plogo.jpeg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = e => {
    // TODO: Implement the password reset functionality using the entered email address
    axios
      .post('http://localhost:8081/authenticat', { email: email })
      .then(res => {
        console.log(res.data)
        navigate('/')
      })
      .catch(err => {
        if (err.response.data && err.response.data.error) {
          setServerErrorMsg(err.response.data.error)
        } else {
          setServerErrorMsg('Something went wrong')
        }
      })

    // Show a success message or redirect to a success page
    alert('Password reset link has been sent to your email address.')
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
              <p className='mb-4 text-sm text-black-700'>
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
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
                />
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Reset Password
                </button>
              </div>
              <hr className='mb-6 border-t' />
              <div className='text-center'>
                <a
                  className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                  href='./register.html'
                >
                  Create an Account!
                </a>
              </div>
              <div className='text-center'>
                <a
                  className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                  href='./index.html'
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
