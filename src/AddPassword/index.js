import './index.css'

const AddPassword = props => {
  const {passwordDetails, isPasswordShow, deletePassword} = props
  const {website, username, password, id} = passwordDetails
  const slicedWord = username.slice(0, 1)

  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li className="list-item">
      <h1 className="initial">{slicedWord}</h1>
      <div className="details-list-item">
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {isPasswordShow ? (
          <p className="website">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button type="button" onClick={onDelete} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default AddPassword
