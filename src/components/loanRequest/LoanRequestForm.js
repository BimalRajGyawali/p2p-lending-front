import React, { useEffect, useState } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import axios from 'axios'
import alert from '@coreui/coreui/js/src/alert'

const LoanRequestForm = () => {
  const [loanTypes, setLoanTypes] = useState([])
  const [loanAmount, setLoanAmount] = useState(0.0)
  const [loanDuration, setLoanDuration] = useState(0)
  const [loanType, setLoanType] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8082/api/v1/getAllLoanTypes',
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
    e.preventDefault()
    setLoading(true)

    axios({
      method: 'post',
      url: 'http://localhost:8082/api/v1/createLoan',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      data: {
        duration: loanDuration,
        amount: loanAmount,
        borrower: localStorage.getItem('email'),
        loanType,
      },
    })
      .then((res) => {
        alert('Loan Requested successfully')
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response.data.error)
        const msg = err.response.data.error
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
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>Request Loan</>
            )}
          </CButton>
        </div>
      </CForm>
    </>
  )
}

export default LoanRequestForm
