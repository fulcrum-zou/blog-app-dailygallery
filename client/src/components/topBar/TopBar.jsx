import "./topBar.css";
import Avatar from "../../images/fulcrum_avatar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Topbar() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // window.location.reload();
  };

  // const handleClick = async () => {
  //   await props.setPages(1);
  // };

  return (
    <div className="top">
      <div className="topLeft">
        {user ? (
          <Link to={{ pathname: user.github }} target="_blank">
            <i className="topIcon fa-brands fa-github-square"></i>
          </Link>
        ) : (
          <i className="topIcon fa-brands fa-github-square"></i>
        )}
        {user ? (
          <Link to={{ pathname: user.linkedin }} target="_blank">
            <i className="topIcon fa-brands fa-linkedin"></i>
          </Link>
        ) : (
          <i className="topIcon fa-brands fa-linkedin"></i>
        )}
        {user ? (
          <Link to={{ pathname: user.facebook }} target="_blank">
            <i className="topIcon fa-brands fa-facebook-square"></i>
          </Link>
        ) : (
          <i className="topIcon fa-brands fa-facebook-square"></i>
        )}
        {user ? (
          <Link to={{ pathname: user.twitter }} target="_blank">
            <i className="topIcon fa-brands fa-twitter-square"></i>
          </Link>
        ) : (
          <i className="topIcon fa-brands fa-twitter-square"></i>
        )}
        {user ? (
          <Link to={{ pathname: user.instagram }} target="_blank">
            <i className="topIcon fa-brands fa-instagram-square"></i>
          </Link>
        ) : (
          <i className="topIcon fa-brands fa-instagram-square"></i>
        )}
      </div>
      {user && (
        <div className="topMid">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              <Link className="link" to="/">
                {user && "LOGOUT"}
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            {user.profilePic ? (
              <img className="topImg" src={PF + user.profilePic} alt="" />
            ) : (
              <img className="topImg" src={Avatar} alt="" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {user && <p className="topListUsername">Welcome, {user.username}!</p>}
      </div>
    </div>
  );
}

export default Topbar;
