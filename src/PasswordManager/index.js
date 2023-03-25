import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AddPassword from '../AddPassword'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: [],
    isPasswordShow: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onShowPassword = () => {
    this.setState(prevState => ({isPasswordShow: !prevState.isPasswordShow}))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  noPasswordImage = () => {
    const {passwordList, searchInput} = this.state
    const searchResult = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResult.length === 0) {
      return (
        <div className="noPassword-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password"
          />
          <p className="pass">No Passwords</p>
        </div>
      )
    }
    return ''
  }

  getSearchResults = () => {
    const {passwordList, searchInput} = this.state
    const searchResult = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResult
  }

  render() {
    const {
      passwordList,
      isPasswordShow,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
    } = this.state
    const searchResults = this.getSearchResults()
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="img"
        />
        <div className="password-container">
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                className="input"
                value={websiteInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                className="input"
                value={usernameInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                className="input"
                value={passwordInput}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="button1">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="computer"
          />
        </div>
        <div className="password-container-footer">
          <div className="footer">
            <div className="passwords-length">
              <h1 className="para">Your Passwords</h1>
              <p className="count">{passwordList.length}</p>
            </div>
            <div className="searching">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearchPassword}
                className="search-value"
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password">
            <input
              type="checkbox"
              id="checkboxId"
              className="checkbox"
              onClick={this.onShowPassword}
            />
            <label htmlFor="checkboxId" className="password">
              Show Passwords
            </label>
          </div>
          {this.noPasswordImage()}
          <ul className="password-card">
            {searchResults.map(each => (
              <AddPassword
                key={each.id}
                passwordDetails={each}
                isPasswordShow={isPasswordShow}
                deletePassword={this.deletePassword}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default PasswordManager
