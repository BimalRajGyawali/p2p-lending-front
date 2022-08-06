import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoanSuggestionList = () => {
  const [loanSuggestions, setLoanSuggestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8083/api/v1/getLoanSuggestionsForLender/${localStorage.getItem(
        'email',
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        setLoanSuggestions(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const viewSingleSuggestion = (loanSuggestion) => {
    navigate('/singleSuggestion', { state: loanSuggestion })
  }

  return (
    <>
      {loanSuggestions.length > 0 ? (
        <CRow>
          {loanSuggestions.map((loanSuggestion, index) => (
            <CCol style={{ marginBottom: '40px' }} sm={4} key={index + 1}>
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
                      {loanSuggestion.minLendingAmount.toLocaleString('en-US')} to Rs.{' '}
                      {loanSuggestion.maxLendingAmount.toLocaleString('en-US')}
                    </p>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      ) : (
        <p>Loan suggestions will appear here</p>
      )}
    </>
  )
}

export default LoanSuggestionList
