import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CFormInput } from '@coreui/react'
import BackImg from 'src/assets/images/back-button.png'

// eslint-disable-next-line react/prop-types
const LoanSuggestionItem = () => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [loadingAmount, setLoadingAmount] = useState(0)
  const [lendingAmount, setLendingAmount] = useState('')

  const location = useLocation()

  const handleLendingAmountChange = (e) => {
    setLendingAmount(e.target.value)
    setLoadingAmount(parseInt(e.target.value) - walletBalance)
  }

  return (
    <>
      <Link to={'/loanSuggestions'}>
        <img
          style={{
            height: '20px',
            width: '20px',
            cursor: 'pointer',
            marginBottom: '10px',
            marginTop: '-10px',
          }}
          src={BackImg}
        />
      </Link>
      <CCard>
        <CCardBody>
          <CCardText>
            <div style={{ width: '50%', float: 'left' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Loan Request Details</h2>
              <p>{location.state.loanType} Loan</p>
              <p style={{ fontWeight: 'bold', fontSize: '2em' }}>15%</p>
              <p>Requested: Rs. {location.state.loanAmount.toLocaleString('en-US')}</p>
              <p>Remaining: Rs. {location.state.remainingAmount.toLocaleString('en-US')}</p>
              <p style={{ marginTop: '20px' }}>
                Lending Available from Rs. {location.state.lendingRangeMin.toLocaleString('en-US')}{' '}
                to Rs. {location.state.lendingRangeMax.toLocaleString('en-US')}
              </p>
              <div style={{ marginTop: '20px' }}>
                <p style={{ display: 'inline', marginRight: '10px' }}>
                  Enter amount you want to lend :
                </p>
                <span style={{ marginRight: '8px' }}>Rs.</span>
                <CFormInput
                  onChange={handleLendingAmountChange}
                  style={{ width: '200px', display: 'inline' }}
                  type="number"
                  id="lending-amount"
                  name="lending-amount"
                  value={lendingAmount}
                  placeholder={`${location.state.lendingRangeMin.toLocaleString(
                    'en-US',
                  )} - ${location.state.lendingRangeMax.toLocaleString('en-US')}`}
                />
              </div>
              <CButton style={{ backgroundColor: 'navy' }} className="mt-3" active tabIndex={-1}>
                Lend
              </CButton>
            </div>
            <div style={{ width: '50%', float: 'left' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Wallet Summary</h2>
              <p>
                Available Balance: &nbsp;&nbsp;<strong>Rs. {walletBalance}</strong>
              </p>
              {loadingAmount > 0 && (
                <CButton style={{ backgroundColor: 'navy' }} className="mt-3" active tabIndex={-1}>
                  Load Rs. {loadingAmount.toLocaleString('en-US')} into wallet
                </CButton>
              )}
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default LoanSuggestionItem
