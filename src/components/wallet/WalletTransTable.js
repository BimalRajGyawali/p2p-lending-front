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
const WalletTransTable = ({ transactions }) => {
  return (
    <>
      <p style={{ marginBottom: '20px', marginTop: '50px', fontWeight: 'bold' }}>
        Wallet Transactions
      </p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {transactions.map((trans, index) => (
            <CTableRow key={trans.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>
                {trans.amount && trans.amount.toLocaleString('en-Us')}
              </CTableDataCell>
              <CTableDataCell>{trans.type} months</CTableDataCell>
              <CTableDataCell>{trans.remarks} months</CTableDataCell>
              <CTableDataCell>{trans.date + ' ' + trans.time}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default WalletTransTable
