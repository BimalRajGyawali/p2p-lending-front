import React, { Component } from 'react'

import { CAlert } from '@coreui/react'
// eslint-disable-next-line react/prop-types
const LoanRequestInvalid = ({ message }) => {
  return (
    <>
      <CAlert color="info">{message}</CAlert>
    </>
  )
}
export default LoanRequestInvalid
