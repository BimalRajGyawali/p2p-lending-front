import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink
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
import NotificationBadge from './NotificationBadge'

const NotificationDropdown = () => {
  const itemsCount = 5 // Replace with the actual count of items
  return (
    <CDropdown inNav className='c-header-nav-item mx-2'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div className='notification-icon'>
          <CIcon icon={cilBell} size='lg' />
          <NotificationBadge count={itemsCount} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem href='#'>
          <CIcon icon={cilSettings} className='me-2' />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem>
          <CIcon icon={cilLockLocked} className='me-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default NotificationDropdown
