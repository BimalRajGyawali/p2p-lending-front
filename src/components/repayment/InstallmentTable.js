import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

// eslint-disable-next-line react/prop-types
const InstallmentTable = ({ installments, type }) => {
  const payInstallment = (installment) => {
    //make request for pay
  }

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Installment Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Scheduled Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Paid Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {installments.map((installment, index) => (
            <CTableRow key={installment.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{installment.amount.toLocaleString('en-Us')}</CTableDataCell>
              <CTableDataCell>{installment.scheduledDate}</CTableDataCell>
              {type === 'PAID' ? (
                <CTableDataCell>{installment.paidDate}</CTableDataCell>
              ) : (
                <CTableDataCell>-------</CTableDataCell>
              )}
              {type === 'UNPAID' && (
                <CTableDataCell>
                  <CButton style={{ color: 'black' }} onClick={() => payInstallment(installment)}>
                    Pay
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
