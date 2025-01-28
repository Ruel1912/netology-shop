import { Outlet } from 'react-router-dom'
import { Header } from '../../widgets/Header'
import { Banner } from '../../widgets/Banner'
import { Footer } from '../../widgets/Footer'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
