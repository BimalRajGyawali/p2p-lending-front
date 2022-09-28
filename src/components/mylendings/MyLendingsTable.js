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
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilExpandUp } from '@coreui/icons'
// eslint-disable-next-line react/prop-types
const MyLendingsTable = ({ lendings }) => {
  const [visible, setVisible] = useState(false)
  const [interests, setInterests] = useState([])
  const [modalLoading, setModalLoading] = useState(false)

  const handleModalView = (lendingId) => {
    setModalLoading(true)
    const newState = !visible

    setVisible(newState)

    if (newState) {
      // make api request
      //setModalLoading(false)
      setInterests([
        {
          id: 123,
          amount: 5000,
          date: '2020-01-02',
        },
      ])
    }
  }

  return (
    <>
      <p style={{ marginBottom: '30px', fontWeight: 'bold' }}>My Lendings</p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lent Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {lendings.map((lending, index) => (
            <CTableRow key={lending.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>
                {lending.amount && lending.amount.toLocaleString('en-Us')}
              </CTableDataCell>

              <CTableDataCell>{lending.lentDate}</CTableDataCell>
              <CTableDataCell>{lending.status}</CTableDataCell>
              {lending.status === 'DISBURSED' && (
                <CTableDataCell onClick={() => handleModalView(lending.id)}>
                  <CIcon icon={cilExpandUp} style={{ cursor: 'pointer' }} title={'View Returns'} />
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal fullscreen="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Returns received</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalLoading ? (
            <div className="spinner-border" role="status"></div>
          ) : (
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* eslint-disable-next-line react/prop-types */}
                {interests.map((interest, index) => (
                  <CTableRow key={interest.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {interest.amount && interest.amount.toLocaleString('en-Us')}
                    </CTableDataCell>
                    <CTableDataCell>{interest.date}</CTableDataCell>
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

export default MyLendingsTable
