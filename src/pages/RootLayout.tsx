import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const RootLayout: React.FC = () => {
  return (
    <div className='flex flex-row  min-h-screen'>
      <Sidebar />
      <div className='grow my-16 mx-8 sm:ml-16 md:ml-0 sm:mr-16 md:pl-72'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout