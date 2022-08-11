import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userID: '', pwd: '', errMsg: '', isShowErrMsg: false}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailureLogin = errMsg => {
    this.setState({isShowErrMsg: true, errMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {userID, pwd} = this.state
    const userDetails = {user_id: userID, pin: pwd}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const tokenData = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(tokenData.jwt_token)
    } else{
      this.onSubmitFailureLogin(tokenData.error_msg)
    }
  }

  onChangeInputValue = event => {
    this.setState({userID: event.target.value})
  }

  onChangePwdValue = event => {
    this.setState({pwd: event.target.value})
  }

  render() {
    const {userID, pwd, isShowErrMsg, errMsg} = this.state
    console.log(isShowErrMsg, errMsg)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-image-container">
            <img
              className="login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form onSubmit={this.onSubmitDetails} className="form-container">
            <h1 className="login-heading">Welcome Back</h1>
            <label htmlFor="userId" className="label-text">
              User ID
            </label>
            <input
              onChange={this.onChangeInputValue}
              id="userId"
              type="text"
              className="input-element"
              placeholder="Enter User ID"
              value={userID}
            />
            <label htmlFor="pwd" className="label-text">
              PIN
            </label>
            <input
              onChange={this.onChangePwdValue}
              id="pwd"
              type="password"
              className="input-element"
              placeholder="Enter PIN"
              value={pwd}
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          {isShowErrMsg && <p className="err-msg">{errMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
