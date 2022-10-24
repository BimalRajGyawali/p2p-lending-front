import React, {Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CContainer, CSpinner} from '@coreui/react'
import '../scss/style.scss'


// routes config
import routes from '../routes'

// eslint-disable-next-line react/prop-types
const AppContent = () => {
  return (
    <CContainer lg>

      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          {localStorage.getItem('role') === 'BORROWER' && (
            <Route path="/" element={<Navigate to="kyc" replace />} />
          )}

          {localStorage.getItem('role') === 'LENDER' && (
            <Route path="/" element={<Navigate to="loanSuggestions" replace />} />
          )}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
