import '../css/Header.css'

const Header = () => {
  return (
    <ul className="navbar">
        <li className="nav-item">
            Weather
            <div className="ping"></div>
        </li>
        <li className="nav-item">Alert</li>
        <li className="nav-item">Map</li>
        <li className="nav-item">Satellite</li>
        <li className="nav-item">News</li>
    </ul>
  )
}

export default Header