import React, { useEffect, useState } from 'react'
import LoanRequestForm from './LoanRequestForm'
import LoanRequestInvalid from './LoanRequestInvalid'
import LoanRequestTable from './LoanRequestTable'
import axios from 'axios'

const LoanRequestPage = () => {
  const [showForm, setShowForm] = useState(true)

  const [loanType, setLoanType] = useState('')
  const [loanDuration, setLoanDuration] = useState('')
  const [loanAmount, setLoanAmount] = useState(0)
  //
  // useEffect(() => {
  //   axios.post()
  // })

  return (
    <>
      {showForm ? <LoanRequestForm /> : <LoanRequestInvalid />} <hr />
      <div style={{ padding: '20px' }}>
        <LoanRequestTable />
      </div>
    </>
  )
}

export default LoanRequestPage
