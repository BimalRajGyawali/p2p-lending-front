import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons"

import { AppBreadcrumb } from "./index"
import { AppHeaderDropdown } from "./header/index"
import { logo } from "src/assets/brand/logo"
import sidebarShowSlice from "../slices/SidebarShowSlice"
import NotificationDropDown from "./header/NotificationDropdown"

const AppHeader = () => {
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState([])

  const getAllNotifications = () => {
    return axios({
      method: "get",
      url: "http://localhost:8082/notification/getUserNotification",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }

  useEffect(() => {
    getAllNotifications()
      .then((res) => {
        setNotifications(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(sidebarShowSlice.actions.toggle())}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="ms-3">
          <p
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {localStorage.getItem("role")}
          </p>
          <NotificationDropDown notifications={notifications} />
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
