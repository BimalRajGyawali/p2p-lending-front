import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilExpandUp } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const LoanRequestTable = ({ loans }) => {
  const navigate = useNavigate()

  const viewInstallments = (loan) => {
    navigate('/installments', { state: loan })
  }

  return (
    <>
      <p style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '500' }}>
        {' '}
        Your Loan Requests
      </p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Duration</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Requested Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {loans.map((loan, index) => (
            <CTableRow key={loan.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{loan.loanType}</CTableDataCell>
              <CTableDataCell>{loan.duration} months</CTableDataCell>
              <CTableDataCell>{loan.amount.toLocaleString('en-Us')}</CTableDataCell>
              <CTableDataCell>{loan.loanStatus}</CTableDataCell>
              <CTableDataCell>{loan.requestedDate}</CTableDataCell>
              {(loan.loanStatus === 'FULFILLED' || loan.loanStatus === 'COMPLETED') && (
                <CTableDataCell onClick={() => viewInstallments(loan)}>
                  <CIcon
                    icon={cilExpandUp}
                    style={{ cursor: 'pointer' }}
                    title={'View Installments'}
                  />
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default LoanRequestTable
