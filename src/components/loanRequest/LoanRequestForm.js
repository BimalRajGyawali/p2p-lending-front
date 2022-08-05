import React, { Component, useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CSpinner,
  CFormLabel,
} from '@coreui/react'
import axios from 'axios'

const LoanRequestForm = () => {
  const [loanTypes, setLoanTypes] = useState([])
  const [loanAmount, setLoanAmount] = useState(0.0)
  const [loanDuration, setLoanDuration] = useState(0)
  const [loanType, setLoanType] = useState('')

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.15.104:8082/api/v1/getAllLoanTypes',
      data: {},
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((res) => {
        setLoanTypes(res.data.data)
        setLoanType(res.data.data[0])
      })
      .catch((err) => console.log(err))
  }, [])

  const handleLoanTypeChange = (e) => {
    setLoanType(e.target.value)
  }
  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value)
  }
  const handleLoanDurationChange = (e) => {
    setLoanDuration(e.target.value)
  }

  function handleForm(e) {
    console.log(
      JSON.stringify({
        duration: loanDuration,
        amount: loanAmount,
        borrower: localStorage.getItem('email'),
        loanType,
      }),
    )
    axios({
      method: 'post',
      url: 'http://192.168.15.104:8082/api/v1/createLoan',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      data: {
        duration: loanDuration,
        amount: loanAmount,
        borrower: localStorage.getItem('email'),
        loanType,
      },
    })
      .then((res) => {
        console.log(res)
        alert('form succesfully submitted')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CForm>
        <div className="mb-3">
          <CFormLabel>Select Loan Type</CFormLabel>
          <CFormSelect aria-label="Loan Type" options={loanTypes} onChange={handleLoanTypeChange} />
        </div>
        <div className="mb-3">
          <CFormLabel>Loan Amount</CFormLabel>
          <CFormInput
            placeholder="Loan Amount"
            aria-label="amount"
            type="number"
            onChange={handleLoanAmountChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Loan Duration (in months) </CFormLabel>
          <CFormInput
            placeholder="Loan Duration"
            aria-label="Loan Duration"
            type="number"
            onChange={handleLoanDurationChange}
          />
        </div>
        <div className="mb-3">
          <CButton
            type="submit"
            color="primary"
            size="lg"
            style={{ background: 'navy' }}
            onClick={handleForm}
          >
            Request Loan
          </CButton>
        </div>
      </CForm>
    </>
  )
}

export default LoanRequestForm
