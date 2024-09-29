import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './layout.module.css'

function Layout() {
  return (
    <div className={styles.layoutContainer}>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout