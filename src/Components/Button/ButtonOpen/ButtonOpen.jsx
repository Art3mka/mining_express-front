import React, {memo} from 'react'

const ButtonOpen = ({ children, setActive, disabled, className}) => {

  const openWindow = (e) => {
    setActive(true)
  }

  return (
    <div>
        <button disabled={disabled} onClick={e => openWindow(e)} className={className}>
            {children}
        </button>
    </div>
  )
}

export default memo(ButtonOpen)