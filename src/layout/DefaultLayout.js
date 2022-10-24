import React, {useEffect, useState} from 'react'
import {AppContent, AppFooter, AppHeader, AppSidebar} from '../components/index'
import {useNavigate} from 'react-router-dom'
import eventSourceService from '../sse/EventSourceService'

const DefaultLayout = () => {
  const navigate = useNavigate()


  useEffect(() => {
    if (!localStorage.getItem('role')) {
      navigate('/login')
    }else {
      eventSourceService.subscribe(`http://localhost:8082/sse/subscribe/${localStorage.getItem('email')}`)

      eventSourceService.onmessage(data => {
        alert(JSON.parse(data).message)
      })

      return () => {
        eventSourceService.close()
      }
    }

  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent notificationData />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
