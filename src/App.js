import React, {Suspense} from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import './scss/style.scss'
import EmailField from './components/registration/EmailField'
import OtpField from './components/registration/OtpField'
import PasswordField from './components/registration/PasswordField'
import Register from './views/pages/register/Register'
import Login from './views/pages/login/Login'
import Page404 from './views/pages/page404/Page404'
import Page500 from './views/pages/page500/Page500'
import DefaultLayout from './layout/DefaultLayout'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

const App = () => {

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login/>}/>
          <Route path="/register" name="Register Page" element={<Register/>}>
            <Route path="" element={<EmailField/>}/>
            <Route path="otp" element={<OtpField/>}/>
            <Route path="password" element={<PasswordField/>}/>
          </Route>
          <Route exact path="/500" name="Page 500" element={<Page500/>}/>
          <Route path="/404" name="Page 404" element={<Page404/>}/>
          <Route exact path="*" name="Home" element={<DefaultLayout/>}/>
        </Routes>
      </Suspense>
    </HashRouter>
  )

}

export default App
