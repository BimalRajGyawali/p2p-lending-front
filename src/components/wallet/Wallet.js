import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import axios from 'axios'
import WalletTransTable from './WalletTransTable'

const Wallet = () => {
  const [walletTotalBalance, setWalletTotalBalance] = useState(0)
  const [walletAvailableBalance, setWalletAvailableBalance] = useState(0)
  const [transactions, setTransactions] = useState([])

  const fetchWalletBalance = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:8083/api/v1/wallet/getBalance',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  const fetchAllTransactions = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:8083/api/v1/wallet/getAllTransactions',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  useEffect(() => {
    fetchWalletBalance().then((res) => {
      setWalletTotalBalance(parseFloat(res.data.data.totalBalance))
      setWalletAvailableBalance(parseFloat(res.data.data.availableBalance))
    })

    fetchAllTransactions().then((res) => {
      setTransactions(res.data.data)
    })
  }, [])

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText>
            <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Wallet Summary</h2>
            <p style={{ marginBottom: '15px' }}>
              Total Balance: &nbsp;&nbsp;
              <strong>Rs. {walletTotalBalance.toLocaleString('en-Us')} </strong>
            </p>
            <p>
              Available Balance: &nbsp;&nbsp;
              <strong>Rs. {walletAvailableBalance.toLocaleString('en-Us')} </strong>
            </p>

            {transactions.length > 0 ? (
              <div>
                <WalletTransTable transactions={transactions} />
              </div>
            ) : (
              <p
                style={{
                  marginBottom: '20px',
                  fontSize: '0.9em',
                  fontStyle: 'italic',
                  marginTop: '50px',
                }}
              >
                Wallet Transactions will appear here
              </p>
            )}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Wallet
