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
import axios from 'axios'
// eslint-disable-next-line react/prop-types
const UnververifiedKYCTable = ({ lendings }) => {
  const [visible, setVisible] = useState(false)
  const [interests, setInterests] = useState([])
  const [modalLoading, setModalLoading] = useState(false)

  const handleModalView = lendingId => {
    setModalLoading(true)
    const newState = !visible

    setVisible(newState)

    if (newState) {
      // make api request
      axios({
        method: 'get',
        url: 'http://localhost:8082/registration/getAllUnverifiedKYC',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data: {
          lendingId
        }
      })
        .then(res => {
          console.log(res)
          setInterests(res.data.data)
          setModalLoading(false)
        })
        .catch(err => {
          console.log(err)
          alert('Something went wrong')
          setModalLoading(false)
          setVisible(false)
        })
    }
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
            <CTableHeaderCell scope='col'></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {lendings.map((lending, index) => (
            <CTableRow key={lending.lendingId}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>
                {lending.amount && lending.amount.toLocaleString('en-Us')}
              </CTableDataCell>

              <CTableDataCell>
                {new Date(lending.lentDate).toLocaleString()}
              </CTableDataCell>
              <CTableDataCell>{lending.status}</CTableDataCell>
              {lending.status === 'DISBURSED' && (
                <CTableDataCell
                  onClick={() => handleModalView(lending.lendingId)}
                >
                  <CIcon
                    icon={cilExpandUp}
                    style={{ cursor: 'pointer' }}
                    title={'View Returns'}
                  />
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal
        fullscreen='lg'
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Returns received</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalLoading ? (
            <div className='spinner-border' role='status'></div>
          ) : (
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Amount</CTableHeaderCell>
                  <CTableHeaderCell scope='col'> Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* eslint-disable-next-line react/prop-types */}
                {interests.map((interest, index) => (
                  <CTableRow key={interest.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {interest.amount &&
                        interest.amount.toLocaleString('en-Us')}
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(interest.date).toLocaleString()}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

export default UnververifiedKYCTable
