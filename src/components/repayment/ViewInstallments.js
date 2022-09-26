import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import BackImg from '../../assets/images/back-button.png'
import InstallmentTable from './InstallmentTable'

const ViewInstallments = () => {
  const [scheduledInstallments, setScheduledInstallments] = useState([
    {
      id: '123',
      amount: 4000,
      scheduledDate: '2022-01-02',
      paidDate: '2022-02-01',
    },
  ])
  const [missedInstallments, setMissedInstallments] = useState([
    {
      id: '123',
      amount: 4000,
      scheduledDate: '2022-01-02',
    },
  ])
  const [paidInstallments, setPaidInstallments] = useState([
    {
      id: '123',
      amount: 4000,
      scheduledDate: '2022-01-02',
      paidDate: '2022-02-01',
    },
  ])

  const installmentTypes = { UNPAID: 'UNPAID', PAID: 'PAID' }
  const location = useLocation()

  // useEffect(() => {
  //   get installments for loan request
  //   location.state.id
  // })

  return (
    <>
      <Link to={'/loanRequest'}>
        <img
          style={{
            height: '20px',
            width: '20px',
            cursor: 'pointer',
            marginBottom: '10px',
            marginTop: '-10px',
          }}
          src={BackImg}
          alt="back"
        />
      </Link>

      <CCard>
        <CCardBody>
          <CCardText>
            <p style={{ fontWeight: '500', marginBottom: '25px' }}>Loan Details</p>
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
                <CTableRow key={location.state.id}>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>{location.state.loanType}</CTableDataCell>
                  <CTableDataCell>{location.state.duration} months</CTableDataCell>
                  <CTableDataCell>{location.state.amount.toLocaleString('en-Us')}</CTableDataCell>
                  <CTableDataCell>{location.state.loanStatus}</CTableDataCell>
                  <CTableDataCell>{location.state.requestedDate}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardText>
        </CCardBody>
      </CCard>

      {scheduledInstallments.length > 0 && (
        <CCard style={{ marginTop: '30px' }}>
          <CCardBody>
            <CCardText>
              <div style={{ marginTop: '30px' }}>
                <p style={{ fontWeight: '500', marginBottom: '25px' }}>Scheduled Installment</p>
                <InstallmentTable
                  installments={scheduledInstallments}
                  type={installmentTypes.UNPAID}
                />
              </div>
            </CCardText>
          </CCardBody>
        </CCard>
      )}

      {missedInstallments.length > 0 && (
        <CCard style={{ marginTop: '30px' }}>
          <CCardBody>
            <CCardText>
              <div style={{ marginTop: '30px' }}>
                <p style={{ fontWeight: '500', marginBottom: '25px' }}>Missed Installment</p>
                <InstallmentTable
                  installments={missedInstallments}
                  type={installmentTypes.UNPAID}
                />
              </div>
            </CCardText>
          </CCardBody>
        </CCard>
      )}

      {paidInstallments.length > 0 && (
        <CCard style={{ marginTop: '30px' }}>
          <CCardBody>
            <CCardText>
              <div style={{ marginTop: '30px' }}>
                <p style={{ fontWeight: '500', marginBottom: '25px' }}>Paid Installment</p>
                <InstallmentTable installments={paidInstallments} type={installmentTypes.PAID} />
              </div>
            </CCardText>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}
export default ViewInstallments
