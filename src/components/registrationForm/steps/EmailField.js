import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/registrationForm/registrationForm.css";

export default function EmailField() {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("NEXT");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNextClick = (e) => {
    if(!email){
      alert("Email is invalid");
      return;
    }

    setBtnText("Loading...")
    console.log("Loading");

    axios.post("http://localhost:8081/api/v1/sendEmailOTP", {email})
    .then(res => {
      console.log(res.data);
      navigate("/register/otp");
    })
    .catch(err => {
      console.log("Error");
      setBtnText("NEXT");
  })


   
  };

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      <div className="container p-10 my-20">
        <div className="flex flex-col ">
          <div className="flex-1 w-full mx-2">
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
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
  );
}
