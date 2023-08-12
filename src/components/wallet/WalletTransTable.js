import React, { Component } from "react"
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from "@coreui/react"
// eslint-disable-next-line react/prop-types
const WalletTransTable = ({ transactions }) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const getStyle = (type) => {
    if (type === "DEBIT") {
      return {
        color: "red"
      }
    } else if (type === "LOCKED") {
      return {
        color: "blue"
      }
    } else {
      return {
        color: "green"
      }
    }
  }

  return (
    <>
      <p
        style={{ marginBottom: "20px", marginTop: "50px", fontWeight: "bold" }}
      >
        Wallet Transactions
      </p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {transactions.map((trans, index) => (
            <CTableRow key={trans.id}>
              <CTableDataCell>
                {index + 1}
              </CTableDataCell>
              <CTableDataCell>
                {trans.amount && trans.amount.toLocaleString("en-us")}
              </CTableDataCell>
              <CTableDataCell>
                {trans.remarks}
              </CTableDataCell>
              <CTableDataCell>
                {new Date(trans.date).toLocaleString("en-us", options)}
              </CTableDataCell>
              <CTableDataCell style={getStyle(trans.type)}>
                {trans.type}
              </CTableDataCell>

            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default WalletTransTable
