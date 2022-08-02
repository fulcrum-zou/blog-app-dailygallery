import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Avatar from "../../images/fulcrum_avatar.png";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";
import BottomBar from "../../components/bottomBar/BottomBar";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (username && email && password) {
      try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        // dispatch({ type: "LOGOUT" });
        window.location.replace("/");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log(err);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const handleAvatar = async (e) => {
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
      updatedUser.profilePic = filename;
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axiosInstance.delete("/users/" + user._id, {
          data: { userId: user._id },
        });
        dispatch({ type: "LOGOUT" });
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsLeftWrapper">
            <div className="settingsUpdateWrapper">
              <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Account</span>
              </div>
              <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  className="settingsInput"
                  type="text"
                  placeholder={user.username}
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                  className="settingsInput"
                  type="email"
                  placeholder={user.email}
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  className="settingsInput"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="settingsSubmit" type="submit">
                  Update
                </button>

                {error && (
                  <span className="settingsUpdateError">
                    Oops! Something went wrong!
                  </span>
                )}
              </form>
            </div>
          </div>

          <div className="settingsRightWrapper">
            <div className="settingsPictureWrapper">
              <div className="settingsAvatarTitle">Change Avatar</div>
              <form className="settingsPP" onSubmit={handleAvatar}>
                <label htmlFor="fileInput">
                  {/* <i className="settingsPPIcon fa-solid fa-plus"></i> */}
                  <img
                    className="settingsInputImg"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : user.profilePic
                        ? PF + user.profilePic
                        : Avatar
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
                <p className="settingsAvatarText">Click picture to upload</p>
                <button className="settingsAvatarSubmit" type="submit">
                  Update
                </button>
              </form>
            </div>
            <div className="settingsDeleteWrapper">
              <div className="settingsDeleteTitle">Delete Account</div>
              <p className="settingsDeleteText">
                Note: You <b>CANNOT</b> recover your account once delete it.
              </p>
              <button className="settingsDeleteButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
      <BottomBar />
    </>
  );
}
