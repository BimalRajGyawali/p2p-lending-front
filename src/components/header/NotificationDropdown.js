import React from "react"
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
} from "@coreui/react"
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
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"

import avatar8 from "./../../assets/images/avatars/8.jpg"
import { useNavigate } from "react-router-dom"

const NotificationDropDown = ({ notifications }) => {
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    console.log("logout")
    localStorage.setItem("email", "")
    localStorage.setItem("role", "")
    localStorage.setItem("accessToken", "")

    navigate("/login")
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <div>
          <CNavLink href="#">
            <CIcon icon={cilBell} size="lg" />
          </CNavLink>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {notifications.map((notification, index) => (
          <>
            <CDropdownItem href="#" key={index}>
              <CIcon icon={cilBell} className="me-2" />
              {notification.notificationMessage}
            </CDropdownItem>
            {notifications.length - 1 == index ? "" : <CDropdownDivider />}
          </>
        ))}

        {/* <CDropdownItem href='#'>
          hello this is notification dropdown one
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default NotificationDropDown
