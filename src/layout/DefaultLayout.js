import React, {useEffect, useState} from 'react'
import {AppContent, AppFooter, AppHeader, AppSidebar} from '../components/index'
import {useNavigate} from 'react-router-dom'
import eventSourceService from '../sse/EventSourceService'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [notificationData, setNotificationData] = useState({
       userId: '',
      message: ''
  })

  useEffect(() => {
    if (!localStorage.getItem('role')) {
      navigate('/login')
    }else {
      eventSourceService.subscribe('http://localhost:8082/sse/subscribe')

      eventSourceService.onmessage(data => {
        setNotificationData(JSON.parse(data))
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
          <AppContent notificationData={notificationData}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
