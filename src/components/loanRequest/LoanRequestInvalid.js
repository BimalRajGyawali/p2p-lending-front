import React, { Component } from 'react'

import { CAlert } from '@coreui/react'
const LoanRequestInvalid = () => {
  return (
    <>
      <CAlert color="info">
        Sorry You Cannot Request Loan. You Already Have Applied For Loan.
      </CAlert>
    </>
  )
}
export default LoanRequestInvalid
