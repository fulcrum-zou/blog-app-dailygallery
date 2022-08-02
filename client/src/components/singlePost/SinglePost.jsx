import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import Rebels from "../../images/rebels.jpg";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put("/posts/" + path, {
        username: user.username,
        title: title,
        desc: desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async () => {
    try {
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo ? (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        ) : (
          <img className="singlePostImg" src={Rebels} alt="" />
        )}{" "}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          {post.categories && post.categories.length > 0 && (
            <span className="singlePostCat">
              Categories:{" "}
              {post.categories.map((c) => (
                <span className="singlePostCat">{c}</span>
              ))}
            </span>
          )}
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        <div className="buttons">
          {updateMode && (
            <button className="singleCancelButton" onClick={handleCancel}>
              Cancel
            </button>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
