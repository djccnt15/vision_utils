import styles from './css/Layout.module.css'
import PageList from './PageList'

const Layout = ({ children }) => {
  return (
    <div className={styles.div}>
      <nav className={styles.nav}>
        <PageList />
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Layout
