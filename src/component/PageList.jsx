import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
]

const PageList = () => {
  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink to={item.path}>{item.name}</NavLink>
        </li>
      ))}
    </ul>
  )
}

export default PageList
