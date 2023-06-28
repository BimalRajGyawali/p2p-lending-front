import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react"
import React, { useState } from "react"
import axios from "axios"

// eslint-disable-next-line react/prop-types
const InstallmentTable = ({ installments, type }) => {
  const btnStyle = { color: "black" }
  const [payLoading, setPayLoading] = useState(false)

  const payInstallment = (installment) => {
    setPayLoading(true)
    axios({
      method: "post",
      url: "http://localhost:8085/api/v1/payInstallment",
      data: {
        loanId: installment.loanRequest,
        installmentId: installment.id,
        email: localStorage.getItem("email")
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then((res) => {
        console.log(res)
        alert("Installment paid successfully")
        setPayLoading(false)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        alert("Something went wrong")
        setPayLoading(false)
      })
  }

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Installment No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Installment Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Scheduled Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Paid Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {installments.map((installment, index) => (
            <CTableRow key={installment.id}>
              <CTableDataCell>{installment.installmentNumber}</CTableDataCell>
              <CTableDataCell>
                {installment.amount.toLocaleString("en-Us")}
              </CTableDataCell>
              <CTableDataCell>{installment.scheduledDate}</CTableDataCell>
              {type === "PAID" ? (
                <CTableDataCell>{installment.paidDate}</CTableDataCell>
              ) : (
                <CTableDataCell>-------</CTableDataCell>
              )}
              {type === "UNPAID" && (
                <CTableDataCell>
                  <CButton
                    style={btnStyle}
                    onClick={() => payInstallment(installment)}
                  >
                    {payLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <>&nbsp;&nbsp;Pay&nbsp;&nbsp;</>
                    )}
                  </CButton>
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default InstallmentTable
