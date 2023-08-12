import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilLightbulb, cilMoney, cilWallet } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _admin_nav = [
  {
    component: CNavItem,
    name: 'Stats',
    to: '/stats',
    icon: <CIcon icon={cilLightbulb} customClassName='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Unverified Borrowers',
    to: '/unverifiedKYC',
    icon: <CIcon icon={cilWallet} customClassName='nav-icon' />
  }
]

export default _admin_nav
