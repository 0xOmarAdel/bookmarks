import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const RootLayout = () => {
  return (
    <div className='flex flex-row gap-10'>
      <Sidebar />
      <div className='section-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout