import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilLightbulb, cilMoney, cilWallet } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _admin_nav = [
  {
    component: CNavItem,
    name: 'ADMIN',
    to: '/loanSuggestions',
    icon: <CIcon icon={cilLightbulb} customClassName='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Wallet',
    to: '/lenderWallet',
    icon: <CIcon icon={cilWallet} customClassName='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'My Lendings',
    to: '/lendings',
    icon: <CIcon icon={cilMoney} customClassName='nav-icon' />
  }
]

export default _admin_nav
