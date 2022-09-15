import React, { useState } from 'react'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import MyLendingsTable from './MyLendingsTable'

const MyLendings = () => {
  const [myLendings] = useState([
    {
      id: 1,
      amount: 40000,
      date: '2020-01-01',
    },
    {
      id: 1,
      amount: 40000,
      date: '2020-01-01',
    },
    {
      id: 1,
      amount: 40000,
      date: '2020-01-01',
    },
  ])

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText>
            {myLendings.length > 0 ? (
              <div>
                <MyLendingsTable lendings={myLendings} />
              </div>
            ) : (
              <p
                style={{
                  marginBottom: '20px',
                  fontSize: '0.9em',
                  fontStyle: 'italic',
                  marginTop: '50px',
                }}
              >
                Wallet Transactions will appear here
              </p>
            )}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MyLendings
