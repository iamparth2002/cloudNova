import React from 'react'
import SideNav from './_components/SideNav'

const layout = ({children}) => {
  return (
    <div>
        <SideNav/>
        {children}
    </div>
  )
}

export default layout