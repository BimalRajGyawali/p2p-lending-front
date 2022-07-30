import React, { useEffect, useState } from 'react'
import LoanSuggestionItem from './LoanSuggestionItem'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const LoanSuggestionList = () => {
  const [loanSuggestions, setLoanSuggestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoanSuggestions([
      {
        id: 1,
        loanDuration: 6,
        loanType: 'Education',
        loanAmount: 100_000,
        remainingAmount: 40_000,
        lendingRangeMin: 5_000,
        lendingRangeMax: 40_000,
        multipleOf: 5_000,
        requestedOn: '2022/01/01',
      },
      {
        id: 2,
        loanDuration: 6,
        loanType: 'Business',
        loanAmount: 300_000,
        remainingAmount: 1_00_000,
        lendingRangeMin: 5_000,
        lendingRangeMax: 50_000,
        multipleOf: 5_000,
        requestedOn: '2022/01/01',
      },
      {
        id: 3,
        loanDuration: 6,
        loanType: 'Home',
        loanAmount: 500_000,
        remainingAmount: 20_000,
        lendingRangeMin: 5_000,
        lendingRangeMax: 20_000,
        multipleOf: 5_000,
        requestedOn: '2022/01/01',
      },
      {
        id: 3,
        loanDuration: 6,
        loanType: 'Home',
        loanAmount: 500_000,
        remainingAmount: 20_000,
        lendingRangeMin: 5_000,
        lendingRangeMax: 20_000,
        multipleOf: 5_000,
        requestedOn: '2022/01/01',
      },
    ])
  }, [])

  const viewSingleSuggestion = (loanSuggestion) => {
    navigate('/singleSuggestion', { state: loanSuggestion })
  }

  return (
    <>
      <CRow>
        {loanSuggestions.map((loanSuggestion) => (
          <CCol style={{ marginBottom: '40px' }} sm={4} key={loanSuggestion.id}>
            <CCard
              style={{ cursor: 'pointer' }}
              onClick={() => viewSingleSuggestion(loanSuggestion)}
            >
              <CCardBody>
                <CCardTitle>{loanSuggestion.loanType} Loan</CCardTitle>
                <CCardText>
                  <p style={{ fontWeight: 'bold', fontSize: '2em' }}>15%</p>
                  <p>Requested: Rs. {loanSuggestion.loanAmount.toLocaleString('en-US')}</p>
                  <p>Remaining: Rs. {loanSuggestion.remainingAmount.toLocaleString('en-US')}</p>
                  <p style={{ marginTop: '20px' }}>
                    Lending Available from Rs.{' '}
                    {loanSuggestion.lendingRangeMin.toLocaleString('en-US')} to Rs.{' '}
                    {loanSuggestion.lendingRangeMax.toLocaleString('en-US')}
                  </p>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default LoanSuggestionList
