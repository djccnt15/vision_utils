import styles from './css/PageList.module.css'
import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Binary Threshold', path: '/binary-threshold' },
  { name: 'Get Coordinate', path: '/get-coordinate' },
]

const PageList = () => {
  return (
    <ul className={styles.ul}>
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default PageList
