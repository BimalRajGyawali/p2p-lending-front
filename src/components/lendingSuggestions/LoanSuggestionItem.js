import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CFormInput } from '@coreui/react'
import BackImg from 'src/assets/images/back-button.png'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const LoanSuggestionItem = () => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [loadingAmount, setLoadingAmount] = useState(0)
  const [lendingAmount, setLendingAmount] = useState('')
  const [showLoadWalletButton, setShowLoadWalletButton] = useState(true)
  const [loadWalletButtonLoading, setLoadWalletButtonLoading] = useState(false)
  const [lendButtonLoading, setLendButtonLoading] = useState(false)
  const [lendingErrorMsg, setLendingErrorMsg] = useState('')

  const location = useLocation()

  const handleLendingAmountChange = (e) => {
    setLendingAmount(e.target.value)

    if (
      e.target.value > location.state.maxLendingAmount ||
      e.target.value < location.state.minLendingAmount
    ) {
      setLendingErrorMsg(
        `Lending Amount should be in range of ${location.state.minLendingAmount} and ${location.state.maxLendingAmount}`,
      )
      setLoadingAmount(0)
      setShowLoadWalletButton(true)
      return
    }
    if (parseInt(e.target.value) % 5000 !== 0) {
      setLendingErrorMsg('Lending Amount should be multiple of Rs. 5,000')
      setLoadingAmount(0)
      setShowLoadWalletButton(true)
      return
    }
    setLoadingAmount(parseInt(e.target.value) - walletBalance)

    setLendingErrorMsg('')

    if (parseInt(e.target.value) - walletBalance > 0) {
      setShowLoadWalletButton(true)
    } else {
      setShowLoadWalletButton(false)
    }
  }

  const fetchWalletBalance = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:8083/api/v1/wallet/getBalance',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }
  useEffect(() => {
    fetchWalletBalance().then((res) => {
      setWalletBalance(parseFloat(res.data.data.availableBalance))
    })
  }, [])

  const loadWallet = async () => {
    setLoadWalletButtonLoading(true)

    setTimeout(() => {
      axios({
        method: 'post',
        url: 'http://localhost:8083/api/v1/wallet/loadBalance',
        data: {
          amount: loadingAmount,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((res) => {
          setWalletBalance(parseFloat(res.data.data))
          setLoadWalletButtonLoading(false)
          setShowLoadWalletButton(false)
        })
        .catch((err) => {
          setLoadWalletButtonLoading(false)
          alert('Something went wrong')
        })
    }, 400)
  }

  const lend = () => {
    setLendButtonLoading(true)

    axios({
      method: 'post',
      url: 'http://localhost:8083/api/v1/lnd',
      data: {
        amount: lendingAmount,
        loanId: location.state.loanId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        setWalletBalance(parseFloat(res.data.data))
        setLoadWalletButtonLoading(false)
        setShowLoadWalletButton(false)
      })
      .catch((err) => {
        setLoadWalletButtonLoading(false)
        alert('Something went wrong')
      })
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
          alt="back"
        />
      </Link>
      <CCard>
        <CCardBody>
          <CCardText>
            <div style={{ width: '50%', float: 'left' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>Loan Request Details</p>
              <p>{location.state.loanType} Loan</p>
              <p style={{ fontWeight: 'bold', fontSize: '2em' }}>15%</p>
              <p>Requested: Rs. {location.state.loanAmount.toLocaleString('en-US')}</p>
              <p>Remaining: Rs. {location.state.remainingAmount.toLocaleString('en-US')}</p>
              <p style={{ marginTop: '20px' }}>
                Lending Available from Rs. {location.state.minLendingAmount.toLocaleString('en-US')}{' '}
                to Rs. {location.state.maxLendingAmount.toLocaleString('en-US')}
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
                  placeholder={`${location.state.minLendingAmount.toLocaleString(
                    'en-US',
                  )} - ${location.state.maxLendingAmount.toLocaleString('en-US')}`}
                />
              </div>
              <p style={{ color: 'red', marginTop: '20px' }}>{lendingErrorMsg}</p>
              {!showLoadWalletButton && (
                <CButton
                  style={{ backgroundColor: 'navy' }}
                  className="mt-3"
                  active
                  tabIndex={-1}
                  onClick={lend}
                >
                  {lendButtonLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'Lend'
                  )}
                </CButton>
              )}
            </div>
            <div style={{ width: '50%', float: 'left' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Wallet Summary</h2>
              <p>
                Available Balance: &nbsp;&nbsp;<strong>Rs. {walletBalance}</strong>
              </p>
              {loadingAmount > 0 && showLoadWalletButton && (
                <CButton
                  style={{ backgroundColor: 'navy' }}
                  className="mt-3"
                  active
                  tabIndex={-1}
                  onClick={loadWallet}
                >
                  {loadWalletButtonLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>Load Rs. {loadingAmount.toLocaleString('en-US')} into wallet</>
                  )}
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
