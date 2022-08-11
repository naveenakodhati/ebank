import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="nav-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button onClick={onLogout} type="button" className="logout-btn">
          Logout
        </button>
      </div>
      <div className="home-cards-container">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="card-image"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
