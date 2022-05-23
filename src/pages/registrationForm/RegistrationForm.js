import { useState } from "react"
import Stepper from "../../components/registrationForm/Stepper"
import StepperControl from "../../components/registrationForm/StepperControl"
import { UseContextProvider } from "./contexs/StepperContext"
import Payment from "../../components/registrationForm/steps/EnterPassword"
import Final from "../../components/registrationForm/steps/Final"
import "./registrationForm.css"
import React from "react"

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    "Enter Email",
    "Enter OTP",
    "Enter Password",
    "Go To Dashboard",
  ]

  const displayStep = (step) => {
    switch (step) {
      case 3:
        return <Payment />
      case 4:
        return <Final />
      default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep

    direction === "next" ? newStep++ : newStep--
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      {/* Stepper */}
      <div className="container mt-5 horizontal ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-10 my-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  )
}

export default RegistrationForm
