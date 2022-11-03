import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilEco, cilMoney, cilWallet } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Kyc',
    to: '/kyc',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Loan Request',
    to: '/loanRequest',
    icon: <CIcon icon={cilEco} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wallet',
    to: '/borrowerWallet',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
]

export default _nav
