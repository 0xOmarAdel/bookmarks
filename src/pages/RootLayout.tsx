import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const RootLayout = () => {
  return (
    <div className='flex flex-row gap-16 min-h-screen'>
      <Sidebar />
      <div className='grow my-16 pr-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout