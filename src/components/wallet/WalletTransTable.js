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
  const getStyle = (type) => {
    if (type === 'DEBIT') {
      return {
        color: 'red',
      }
    } else if (type === 'LOCKED') {
      return {
        color: 'blue',
      }
    } else {
      return {
        color: 'green',
      }
    }
  }

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
              <CTableDataCell style={getStyle(trans.type)}>{index + 1}</CTableDataCell>
              <CTableDataCell style={getStyle(trans.type)}>
                {trans.amount && trans.amount.toLocaleString('en-Us')}
              </CTableDataCell>
              <CTableDataCell style={getStyle(trans.type)}>{trans.type}</CTableDataCell>
              <CTableDataCell style={getStyle(trans.type)}>{trans.remarks}</CTableDataCell>
              <CTableDataCell style={getStyle(trans.type)}>
                {new Date(trans.date).toLocaleString()}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default WalletTransTable
