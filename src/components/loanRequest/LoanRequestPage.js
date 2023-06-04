import React, { useEffect, useState } from 'react'
import LoanRequestForm from './LoanRequestForm'
import LoanRequestInvalid from './LoanRequestInvalid'
import LoanRequestTable from './LoanRequestTable'
import axios from 'axios'

const LoanRequestPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [reason, setReason] = useState('')
  const [previousLoans, setPreviousLoans] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8081/api/v1/borrower/isEligible/${localStorage.getItem(
        'email'
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {
      setShowForm(res.data.data.eligible)
      if (res.data.data.reasonForIneligibility)
        setReason(res.data.data.reasonForIneligibility)
    })

    axios({
      method: 'get',
      url: `http://localhost:8082/api/v1/borrower/findAllLoan/${localStorage.getItem(
        'email'
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {
      setPreviousLoans(res.data.data)
    })
  }, [])

  return (
    <>
      {showForm ? <LoanRequestForm /> : <LoanRequestInvalid message={reason} />}{' '}
      <hr />
      {previousLoans.length > 0 && (
        <div style={{ padding: '20px' }}>
          <LoanRequestTable loans={previousLoans} />
        </div>
      )}
    </>
  )
}

export default LoanRequestPage
