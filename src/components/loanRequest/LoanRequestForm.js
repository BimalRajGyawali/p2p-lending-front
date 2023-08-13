import React, { useEffect, useState } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect,CCol,CFormTextarea } from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoanRequestForm = () => {
  const [loanTypes, setLoanTypes] = useState([])
  const [loanAmount, setLoanAmount] = useState(0.0)
  const [loanDuration, setLoanDuration] = useState(0)
  const [loanType, setLoanType] = useState('')
  const [supportingDocument, setSupportingDocument] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedLoanType, setSelectedLoanType] = useState('education')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

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
    setSelectedLoanType(e.target.value.toLowerCase())
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }
  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value)
  }
  const handleLoanDurationChange = (e) => {
    setLoanDuration(e.target.value)
  }
  const handleSupportingDocumentChange = (e) => {
  setSupportingDocument(e.target.files[0])
  }

  function handleForm(e) {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData()
    formData.append('duration', loanDuration)
    formData.append('amount', loanAmount)
    formData.append('borrower', localStorage.getItem('email'))
    formData.append('loanType', loanType)
    formData.append('message', message)
    formData.append('supportingDoc', supportingDocument)

    axios({
      method: 'post',
      url: 'http://localhost:8082/api/v1/createLoan',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'  },

      data: formData,
    })
      .then((res) => {
        alert('Loan Requested successfully')
        setLoading(false)
        window.location.reload()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response.data.error)
        err.response.data.error && alert(err.response.data.error)
        // err.response.data.errors.duration && alert(err.response.data.errors.duration)
      })
  }

  return (
    <>
      <CForm className='row g-3'>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>Select Loan Type</CFormLabel>
          <CFormSelect aria-label="Loan Type" options={loanTypes} onChange={handleLoanTypeChange} />
        </div>
        </CCol>
        <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>Loan Amount</CFormLabel>
          <CFormInput
            placeholder="Loan Amount"
            aria-label="amount"
            type="number"
            onChange={handleLoanAmountChange}
          />
        </div>
        </CCol>
        <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>Loan Duration (in months) </CFormLabel>
          <CFormInput
            placeholder="Loan Duration"
            aria-label="Loan Duration"
            type="number"
            onChange={handleLoanDurationChange}
          />
        </div>
        </CCol>

        <CCol md={6}>
        <div className='mb-4'>
        <CFormInput
          type='file'
          id='Supporting Document'
            label={`Supporting Document for ${selectedLoanType} Loan` }
          onChange={(e) => {
            handleSupportingDocumentChange(e)
          }}
        />
          </div>
      </CCol>
      <CCol md={12}>
        <div className='mb-4'>
            <CFormLabel htmlFor='exampleFormControlTextarea1'>
              Briefly specify the reason for the loan
            </CFormLabel>
            <CFormTextarea
              id='exampleFormControlTextarea1'
              rows={3}
              value={message}
              onChange={handleMessageChange}
            ></CFormTextarea>
         </div>
      </CCol>
      
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
