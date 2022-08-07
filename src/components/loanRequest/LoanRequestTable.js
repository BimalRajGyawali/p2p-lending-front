import React, { Component } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
// eslint-disable-next-line react/prop-types
const LoanRequestTable = ({ loans }) => {
  return (
    <>
      <p style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '500' }}>
        {' '}
        Your Previous Loan Requests
      </p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Duration</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Loan Status</CTableHeaderCell>
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
              <CTableDataCell>{loan.suggestionStatus}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default LoanRequestTable
