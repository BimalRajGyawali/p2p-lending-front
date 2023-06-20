import React from 'react'
import PropTypes from 'prop-types'

function NotificationBadge({ count }) {
  return (
    <div className='notification-badge'>
      {count > 0 && <div className='notification-count'>{count}</div>}
    </div>
  )
}

NotificationBadge.propTypes = {
  count: PropTypes.number.isRequired
}

export default NotificationBadge
