import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilLightbulb, cilWallet } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _lender_nav = [
  {
    component: CNavItem,
    name: 'Loan Suggestions',
    to: '/loanSuggestions',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wallet',
    to: '/lenderWallet',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
]

export default _lender_nav
