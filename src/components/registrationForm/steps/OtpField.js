import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function OtpField() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
   setOtp(e.target.value);
  }

  const handleNextClick = (e) => {
    alert(otp);
  }

  const handleBackClick = (e) => {
    navigate("/register");
  }

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
    <div className="container p-10 my-20">
    <div className="flex flex-col ">
      <div className="flex-1 w-full mx-2">
        <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
          Verification
        </div>
        <p className="my-1">An OTP is sent to your email. Please enter it here.</p>
        <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={otp}
            name="OTP"
            placeholder="Enter OTP"
            autoComplete="on"
            type="text"
            className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          />
        </div>
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
              Next
            </button>
      </div>
    </div>
    </div>
    </div>
  )
}
