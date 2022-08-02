import "./write.css";
import Ahsoka from "../../images/ahsoka.jpg";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import BottomBar from "../../components/bottomBar/BottomBar";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="writeWrapper">
        <div className="write">
          {file ? (
            <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
          ) : (
            <img src={Ahsoka} className="writeImg" alt="" />
          )}
          <form action="" className="writeForm">
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fa-regular fa-file"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="Untitled"
                className="writeInput"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                placeholder="Start writing here..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </form>
          <button className="writeSubmit" type="submit" onClick={handleSubmit}>
          Post
        </button>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
