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
} from '@coreui/react'
import BackImg from '../../assets/images/back-button.png'
import InstallmentTable from './InstallmentTable'
import axios from 'axios'

const ViewInstallments = () => {
  const [upcomingInstallments, setUpcomingInstallments] = useState([])
  const [missedInstallments, setMissedInstallments] = useState([])
  const [paidInstallments, setPaidInstallments] = useState([])

  const installmentTypes = { UNPAID: 'UNPAID', PAID: 'PAID' }
  const location = useLocation()

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8085/api/v1/getInstallments',
      data: {
        loanId: location.state.id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        console.log(res)
        setUpcomingInstallments(res.data.data.upcomingInstallment)
        setPaidInstallments(res.data.data.paidInstallment)
        setMissedInstallments(res.data.data.missedInstallment)
      })
      .catch((err) => {
        alert('Something went wrong')
      })
  }, [])

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

      {upcomingInstallments.length > 0 && (
        <CCard style={{ marginTop: '30px' }}>
          <CCardBody>
            <CCardText>
              <div>
                <p style={{ fontWeight: '500', marginBottom: '25px' }}>Scheduled Installment</p>
                <InstallmentTable
                  installments={upcomingInstallments}
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
            {missedInstallments.length > 0 ? (
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
            ) : (
              <p style={{ fontStyle: 'italic' }}>Missed installments will appear here</p>
            )}
          </CAccordionBody>
        </CAccordionItem>

        <CAccordionItem style={{ marginTop: '20px' }}>
          <CAccordionHeader>Paid Installments</CAccordionHeader>
          <CAccordionBody>
            {paidInstallments.length > 0 ? (
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
            ) : (
              <p style={{ fontStyle: 'italic' }}>Paid installments will appear here</p>
            )}
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  )
}
export default ViewInstallments
