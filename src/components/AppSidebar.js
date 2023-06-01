import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import borrowerNav from '../_nav'
import lenderNav from '../_lender_nav'
import adminNav from 'src/_admin_nav'

const AppSidebar = () => {
  let navigation = borrowerNav
  const dispatch = useDispatch()
  const unfoldable = useSelector(state => state.sidebarUnfoldable)
  const sidebarShow = useSelector(state => state.sidebarShow)
  const role = localStorage.getItem('role')
  if (role === 'LENDER') {
    navigation = lenderNav
  } else if (role === 'ADMIN') {
    navigation = adminNav
  }
  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={visible => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className='d-none d-md-flex' to='/'>
        <p>P2P Lending</p>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
