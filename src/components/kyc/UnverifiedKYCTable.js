import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilExpandUp } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const UnververifiedKYCTable = ({ unverifiedKYCList }) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const handleViewKyc = email => {
    navigate(`/kyc/${email}`)
  }

  return (
    <>
      <p style={{ marginBottom: '30px', fontWeight: 'bold' }}>My Lendings</p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>#</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Full Name</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Last Updated</CTableHeaderCell>
            <CTableHeaderCell scope='col'>User Type</CTableHeaderCell>
            <CTableHeaderCell scope='col'>Email</CTableHeaderCell>
            <CTableHeaderCell scope='col'>View</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {unverifiedKYCList.map((unverifiedKYC, index) => (
            <CTableRow key={unverifiedKYC.KYCId}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{unverifiedKYC.fullName}</CTableDataCell>
              <CTableDataCell>{unverifiedKYC.lastUpdated}</CTableDataCell>
              <CTableDataCell>{unverifiedKYC.userType}</CTableDataCell>
              <CTableDataCell>{unverifiedKYC.email}</CTableDataCell>
              <CTableDataCell
                onClick={() => handleViewKyc(unverifiedKYC.email)}
              >
                <CIcon
                  icon={cilExpandUp}
                  style={{ cursor: 'pointer' }}
                  title={'View '}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default UnververifiedKYCTable
