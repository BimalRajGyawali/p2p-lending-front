import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../pages/registrationForm/registrationForm.css";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../slices/userSlice";

export default function EmailField() {
  const storedEmail = useSelector(state => state.user.email || "");
  const storedRole = useSelector(state => state.user.role || "");
  const [email, setEmail] = useState(storedEmail);
  const [role, setRole] = useState(storedRole);
  const [btnText, setBtnText] = useState("NEXT");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [roleErrorMsg, setRoleErrorMsg] = useState("");
  const [serverErrorMsg, setServerErrorMsg] = useState("");

  const dispatch = useDispatch();

  const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (!isEmailValid(e.target.value)) {
      setEmailErrorMsg("Please enter a valid email");
    } else {
      setEmailErrorMsg("");
    }
  };

  const handleRoleChange = (e) => {
      setRoleErrorMsg("");
      setRole(e.target.value);
  }

  const handleNextClick = (e) => {
    if (!isEmailValid(email)) {
      setEmailErrorMsg("Please enter a valid email");
      return;
    }
    if(!role){
      setRoleErrorMsg("Please select a role");
      return;
    }

    setBtnText("Loading...");
    console.log("Loading");

    axios
      .post("http://localhost:8081/api/v1/sendEmailOTP", { email })
      .then((res) => {
        console.log(res.data);
        dispatch(userSlice.actions.setEmail(email));
        dispatch(userSlice.actions.setRole(role));
        navigate("/register/otp");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setBtnText("NEXT");
        if (err.response.data.error) {
          setServerErrorMsg(err.response.data.error);
        } else {
          setServerErrorMsg("Something went wrong");
        }
      });
  };

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      <div className="container p-10 my-20">
        <div className="flex flex-col ">
          <div className="flex-1 w-full mx-2">
            <p className="mb-4 text-red-500">{serverErrorMsg}</p>

            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
              Register As
            </div>

            <div className="mt-2 form-check">
              <input onChange={handleRoleChange} className="w-4 h-4 mt-1 mr-1 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" 
              id="borrower" name="role" value="BORROWER" checked={role === "BORROWER"}/>
              <label for="borrower">Borrower</label>

              <input onChange={handleRoleChange} className="w-4 h-4 mt-1 ml-4 mr-1 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" 
              type="radio" id="investor" name="role" value="INVESTOR" checked={role === "INVESTOR"}/>
              <label for="investor">Investor</label>
            </div>
            <p className="mt-2 mb-4 text-red-500">{roleErrorMsg}</p>

            <div className="h-6 mt-5 text-xs font-bold leading-8 text-gray-500 uppercase">
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
            <p className="mb-4 text-red-500">{emailErrorMsg}</p>
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
