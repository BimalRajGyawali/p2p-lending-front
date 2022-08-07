import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import axios from 'axios'
import LoanRequestTable from '../loanRequest/LoanRequestTable'
import WalletTransTable from './WalletTransTable'

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0)
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
      setWalletBalance(parseFloat(res.data.data))
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
            <p>
              Available Balance: &nbsp;&nbsp;
              <strong>Rs. {walletBalance.toLocaleString('en-Us')} </strong>
            </p>

            {transactions.length > 0 && (
              <div>
                <WalletTransTable transactions={transactions} />
              </div>
            )}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Wallet
