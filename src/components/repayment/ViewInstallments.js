import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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

      {scheduledInstallments.length > 0 && (
        <CCard style={{ marginTop: '30px' }}>
          <CCardBody>
            <CCardText>
              <div>
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

      <CAccordion style={{ marginTop: '30px' }}>
        <CAccordionItem>
          <CAccordionHeader>Missed Installments</CAccordionHeader>
          <CAccordionBody>
            {missedInstallments.length > 0 && (
              <CCard>
                <CCardBody>
                  <CCardText>
                    <div>
                      <InstallmentTable
                        installments={missedInstallments}
                        type={installmentTypes.UNPAID}
                      />
                    </div>
                  </CCardText>
                </CCardBody>
              </CCard>
            )}
          </CAccordionBody>
        </CAccordionItem>

        <CAccordionItem style={{ marginTop: '20px' }}>
          <CAccordionHeader>Paid Installments</CAccordionHeader>
          <CAccordionBody>
            {paidInstallments.length > 0 && (
              <CCard>
                <CCardBody>
                  <CCardText>
                    <div>
                      <InstallmentTable
                        installments={paidInstallments}
                        type={installmentTypes.PAID}
                      />
                    </div>
                  </CCardText>
                </CCardBody>
              </CCard>
            )}
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  )
}
export default ViewInstallments
