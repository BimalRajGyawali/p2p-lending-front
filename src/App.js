import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import EmailField from "./components/registrationForm/steps/EmailField"
import RegistrationPage from "./pages/RegistrationPage"
import OtpField from "./components/registrationForm/steps/OtpField"
import PasswordField from "./components/registrationForm/steps/PasswordField"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />}>
          <Route path="" element={<EmailField />} /> 
          <Route path="otp" element={<OtpField />} /> 
          <Route path="password" element={<PasswordField />} />
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
