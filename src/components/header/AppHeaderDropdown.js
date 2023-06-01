import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()
    console.log('logout')
    localStorage.setItem('email', '')
    localStorage.setItem('role', '')
    localStorage.setItem('accessToken', '')

    navigate('/login')
  }

  return (
    <CDropdown variant='nav-item'>
      <CDropdownToggle placement='bottom-end' className='py-0' caret={false}>
        <div
          style={{
            borderRadius: '50%',
            backgroundColor: 'navy',
            color: 'white',
            height: '30px',
            width: '30px',
            textAlign: 'center'
          }}
        >
          {localStorage.getItem('email') &&
            localStorage.getItem('email').charAt(0).toUpperCase()}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem href='#'>
          <CIcon icon={cilSettings} className='me-2' />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className='me-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
