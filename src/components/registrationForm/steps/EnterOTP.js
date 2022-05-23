import { useStepperContext } from "../../../pages/registrationForm/contexs/StepperContext"

export default function Details() {
  const { userData, setUserData } = useStepperContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  return (
    <div className="flex flex-col ">
      <div className="flex-1 w-full mx-2">
        <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
          Enter OTP
        </div>
        <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["OTP"] || ""}
            name="OTP"
            placeholder="Enter OTP"
            className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          />
        </div>
      </div>
    </div>
  )
}
