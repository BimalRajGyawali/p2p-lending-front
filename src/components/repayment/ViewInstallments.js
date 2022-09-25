import React from 'react'
import { useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardText } from '@coreui/react'

const ViewInstallments = () => {
  const location = useLocation()

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText>
            <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Loan Details</h2>
            <div style={{ display: 'flex' }}>
              <p style={{ marginRight: '50px' }}>
                Loan Amount : {location.state.amount.toLocaleString('en-Us')}
              </p>
              <p style={{ marginRight: '50px' }}>Status: {location.state.loanStatus}</p>
              <p style={{ marginRight: '50px' }}>Requested Date: {location.state.requestedDate} </p>
            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <p style={{ marginRight: '50px' }}>Loan Duration: {location.state.duration}</p>
              <p style={{ marginRight: '50px' }}>Loan Type: {location.state.loanType}</p>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewInstallments
