import React, { useEffect, useState } from "react";
import {
  CButton,
  CForm,
  CCard,
  CCardText,
  CCardBody,
  CFormInput,
  CFormLabel,
  CFormRange,
  CFormSelect,
  CCol
} from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { timelineOppositeContentClasses } from "@mui/lab";

const LendView = () => {

  const SERVER = "localhost:8082";

  const [loanAmount, setLoanAmount] = useState(0.0);
  const [monthOptions, setMonthOptions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxAmountValidationErrorMsg, setMaxAmountValidationErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://${SERVER}/api/v1/getAvailableLendingDurationList`,
      data: {},
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    })
      .then((res) => {
        console.log(res.data.data);
        setMonthOptions(res.data.data);
        setSelectedMonth(res.data.data[0]);

        fetchMaxLendingAmount(res.data.data[0])
          .then((res) => {
            console.log(res.data.data);
            setMaxAmount(res.data.data);
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }, []);

  const fetchMaxLendingAmount = (month) => {
    return axios({
      method: "get",
      url: `http://${SERVER}/api/v1/getMaximumLendingAmount?duration=${month}`,
      data: {},
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    });

  };

  const handle = (e) => {
    setMaxAmountValidationErrorMsg("");
    setLoanAmount(e.target.value);

    if (parseInt(e.target.value) > maxAmount || parseInt(e.target.value) < 5000) {
      setMaxAmountValidationErrorMsg(`Amount should be in range: 5,000 to ${maxAmount.toLocaleString("en-us")}`);
    }
  };

  const handleMonthOptionsChange = (e) => {
    setSelectedMonth(e.target.value);

    fetchMaxLendingAmount(e.target.value)
      .then((res) => {
        console.log(res.data.data);
        setMaxAmount(res.data.data);
      })
      .catch((err) => console.log(err));


  };

  const handleForm = () => {
    if (!loanAmount || !selectedMonth) {
      setMaxAmountValidationErrorMsg(`Amount should be in range: 5,000 to ${maxAmount}`);
      return;
    }

    setLoading(true);

    axios({
      method: "post",
      url: `http://${SERVER}/api/v1/lend`,
      data: {
        amount: loanAmount,
        lendingDuration: parseInt(selectedMonth)
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then((res) => {
        alert("Lending successful");
        setLoading(false)
        navigate("/lendings");
      })
      .catch((err) => {

        if (err.response && err.response.status === 400) {
          alert(err.response.data.error);
          setLoading(false);
          return;
        }
        alert("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText className="row">
            <CCol>
            <p>
              <span style={{ fontWeight: "bold", fontSize: "3em" }}>15%</span>
              <span style={{ fontSize: "0.9em", paddingLeft: "10px", fontStyle:"italic" }}>expected ROI</span>
            </p>
            <CForm className="mt-4">

              <div className="mb-3 mt-4 w-50">
                <span>Lending Duration (in months):</span>
                <CFormSelect className="" aria-label="Month Options" options={monthOptions}
                             onChange={handleMonthOptionsChange}
                />
              </div>

              <div className="mb-2 mt-4">
                <CFormInput
                  placeholder="Loan Amount"
                  aria-label="amount"
                  type="number"
                  min={0}
                  onChange={handle}
                  className="w-50"
                  floatingLabel="Lending Amount"
                />
                <p style={{ color: "red", fontSize: "0.9em"}} className="mt-1">&nbsp;{maxAmountValidationErrorMsg}</p>
              </div>

              <div className="mb-3 mt-3">
                <CButton
                  type="submit"
                  color="primary"
                  size="lg"
                  style={{ background: "navy" }}
                  onClick={handleForm}
                >
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>Lend</>
                  )}
                </CButton>
              </div>
            </CForm>
            </CCol>

          <CCol>
            <h3 style={{fontSize: "1.2em"}}>Lend amount between given range</h3>
              <Timeline style={{marginLeft: "-500px", marginTop: "30px"}}>
                <TimelineItem >
                  <TimelineSeparator>
                    <TimelineDot color="secondary" />
                    <TimelineConnector  />
                  </TimelineSeparator>
                  <TimelineContent>5,000</TimelineContent>
                </TimelineItem>

                <TimelineItem >
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    <TimelineConnector  />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>

                <TimelineItem >
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    <TimelineConnector  />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>

                <TimelineItem >
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    <TimelineConnector  />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
                  </TimelineSeparator>
                  <TimelineContent>{maxAmount.toLocaleString("en-us")}</TimelineContent>
                </TimelineItem>
              </Timeline>


          </CCol>
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  );
};

export default LendView;
