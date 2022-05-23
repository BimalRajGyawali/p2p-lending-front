import { useStepperContext } from "../../../pages/registrationForm/contexs/StepperContext"

export default function Account() {
  const { userData, setUserData } = useStepperContext()

  const handleChange = (e) => {
    setUserData({ ...userData, email: e.target.value })
  }

  return (
    <div className="flex flex-col ">
      <div className="flex-1 w-full mx-2">
        <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
          Email Address
        </div>
        <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="Email Address"
            placeholder="Email Address"
            className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          />
        </div>
      </div>
    </div>
  )
}
