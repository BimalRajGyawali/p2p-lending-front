import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
// eslint-disable-next-line react/prop-types
const MyLendingsTable = ({ lendings }) => {
  return (
    <>
      <p style={{ marginBottom: '20px', marginTop: '50px', fontWeight: 'bold' }}>My Lendings</p>

      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
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

              <CTableDataCell>{lending.date}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default MyLendingsTable
