import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const navigate = useNavigate()

  const handleLogin = () => {
    axios
      .post('http://localhost:8081/login', { email: username, password, role: 'INVESTOR' })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('accessToken', res.data.data.token)
        const decoded = jwtDecode(res.data.data.token)
        console.log(decoded)
        localStorage.setItem('username', username)
        localStorage.setItem('role', 'LENDER')
        navigate('/')
      })
      .catch((err) => {
        if (err.response.data && err.response.data.error) {
          setServerErrorMsg(err.response.data.error)
        } else {
          setServerErrorMsg('Something went wrong')
        }
      })
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Sign In to your account</h1>
                    <div className="mt-4" />
                    <p className="mt-2 mb-3 text-red-500">{serverErrorMsg}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          style={{ background: 'blue' }}
                          onClick={handleLogin}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Be a borrower for hassle free loan with best interest rates. Be a lender for
                      lending at higher rates.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
