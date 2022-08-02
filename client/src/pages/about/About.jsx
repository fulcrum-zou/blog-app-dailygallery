import "./about.css";
import Girls from "../../images/girls.jpg";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";
import BottomBar from "../../components/bottomBar/BottomBar";

export default function About() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";

  const [file, setFile] = useState(null);
  const [about, setAbout] = useState(user.about);
  const [github, setGithub] = useState(user.github);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [facebook, setFacebook] = useState(user.facebook);
  const [twitter, setTwitter] = useState(user.twitter);
  const [instagram, setIntagram] = useState(user.instagram);
  const [setError] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handlePictureSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.aboutPic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        setError(true);
      }
      try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        window.alert("Successfully Update");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log(err);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const handleDescSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      about,
    };
    if (about) {
      try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        window.location.reload();
        window.alert("Successfully Update");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log(err);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      github,
      linkedin,
      facebook,
      twitter,
      instagram,
    };
    if (github && linkedin && facebook && twitter && instagram) {
      try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        window.location.reload();
        window.alert("Successfully Update");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log(err);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="about">
        <div className="aboutWrapper">
          <div className="aboutLeftWrapper">
            <div className="aboutPictureWrapper">
              <p className="aboutTitle aboutPictureTitle">
                Choose one to represent your style!
              </p>
              <p className="aboutPictureText">Click picture to upload</p>
              <form className="aboutPicture">
                <label htmlFor="fileInput">
                  <img
                    className="aboutInputImg"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : user.aboutPic
                        ? PF + user.aboutPic
                        : Girls
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  className="aboutSubmit aboutPictureSubmit"
                  type="submit"
                  onClick={handlePictureSubmit}
                >
                  Update
                </button>
              </form>
            </div>
            <div className="aboutDescWrapper">
              <p className="aboutTitle aboutDescTitle">
                Write something about yourself!
              </p>
              <form action="" className="aboutDescForm">
                <div className="aboutDesc">
                  <textarea
                    className="aboutDescEdit"
                    placeholder={user.about}
                    defaultValue={user.about}
                    type="text"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="aboutSubmit aboutDescSubmit"
                  type="submit"
                  onClick={handleDescSubmit}
                >
                  Update
                </button>
              </form>
            </div>
          </div>

          <div className="aboutRightWrapper">
            <div className="aboutLinkWrapper">
              <p className="aboutTitle aboutLinkTitle">
                Edit your other links!
              </p>
              <form className="aboutLinkForm">
                <label>
                  <i className="aboutIcon fa-brands fa-github-square"></i>
                  <span className="aboutIconText">GitHub</span>
                </label>
                <input
                  className="aboutInput"
                  type="text"
                  placeholder={user.github}
                  defaultValue={user.github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <label>
                  <i className="aboutIcon fa-brands fa-linkedin"></i>
                  <span className="aboutIconText">LinkedIn</span>
                </label>
                <input
                  className="aboutInput"
                  type="text"
                  placeholder={user.linkedin}
                  defaultValue={user.linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <label>
                  <i className="aboutIcon fa-brands fa-facebook-square"></i>
                  <span className="aboutIconText">FaceBook</span>
                </label>
                <input
                  className="aboutInput"
                  type="text"
                  placeholder={user.facebook}
                  defaultValue={user.facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                <label>
                  <i className="aboutIcon fa-brands fa-twitter-square"></i>
                  <span className="aboutIconText">Twitter</span>
                </label>
                <input
                  className="aboutInput"
                  type="text"
                  placeholder={user.twitter}
                  defaultValue={user.twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <label>
                  <i className="aboutIcon fa-brands fa-instagram-square"></i>
                  <span className="aboutIconText">Instagram</span>
                </label>
                <input
                  className="aboutInput"
                  type="text"
                  placeholder={user.instagram}
                  defaultValue={user.instagram}
                  onChange={(e) => setIntagram(e.target.value)}
                />
                <button
                  className="aboutSubmit aboutLinkSubmit"
                  type="submit"
                  onClick={handleLinkSubmit}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
      <BottomBar />
    </>
  );
}
