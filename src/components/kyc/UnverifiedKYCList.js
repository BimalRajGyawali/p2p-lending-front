import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardText } from '@coreui/react'
import UnververifiedKYCTable from './UnverifiedKYCTable'
import axios from 'axios'

const UnverifiedKYCList = () => {
  const [myLendings, setMyLendings] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8082/registration/getAllUnverifiedKYC',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        console.log(res)
        setMyLendings(res.data.data)
      })
      .catch(err => {
        alert('Something went wrong')
      })
  }, [])

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText>
            {myLendings.length > 0 ? (
              <div>
                <UnververifiedKYCTable lendings={myLendings} />
              </div>
            ) : (
              <p
                style={{
                  marginBottom: '20px',
                  fontSize: '0.9em',
                  fontStyle: 'italic',
                  marginTop: '50px'
                }}
              >
                All Unverified KYC will appear here
              </p>
            )}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UnverifiedKYCList
