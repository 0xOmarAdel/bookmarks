import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <div className='section-container'>
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout