import "./sidebar.css";
import Girls from "../../images/girls.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Sidebar() {
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  
  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const aboutTitle = user ? "ABOUT ME" : "ABOUT THIS SITE";
  const followTitle = user ? "FOLLOW ME" : "FOLLOW THE AUTHOR";
  const about = "random texts";

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">{aboutTitle}</span>
        {user ? (
          <img
            className="sideImg"
            src={user.aboutPic ? PF + user.aboutPic : Girls}
            alt=""
          />
        ) : (
          <img className="sideImg" src={Girls} alt="" />
        )}
        {/* <img src={Girls} alt="" /> */}
        <p>{user ? user.about : about}</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <div className="sidebarList">
          {cats.map((c) => (
            <Link to={`?cat=${c.name}`} className="link">
              <div className="sidebarListItem">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">{followTitle}</span>
        <div className="sidebarSocial">
          {user ? (
            <Link to={{ pathname: user.github }} target="_blank">
              <i className="sidebarIcon fa-brands fa-github-square"></i>
            </Link>
          ) : (
            <i className="sidebarIcon fa-brands fa-github-square"></i>
          )}
          {user ? (
            <Link to={{ pathname: user.linkedin }} target="_blank">
              <i className="sidebarIcon fa-brands fa-linkedin"></i>
            </Link>
          ) : (
            <i className="sidebarIcon fa-brands fa-linkedin"></i>
          )}
          {user ? (
            <Link to={{ pathname: user.facebook }} target="_blank">
              <i className="sidebarIcon fa-brands fa-facebook-square"></i>
            </Link>
          ) : (
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          )}
          {user ? (
            <Link to={{ pathname: user.twitter }} target="_blank">
              <i className="sidebarIcon fa-brands fa-twitter-square"></i>
            </Link>
          ) : (
            <i className="sidebarIcon fa-brands fa-twitter-square"></i>
          )}
          {user ? (
            <Link to={{ pathname: user.instagram }} target="_blank">
              <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            </Link>
          ) : (
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          )}
        </div>
      </div>
    </div>
  );
}
