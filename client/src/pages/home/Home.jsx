import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import BottomBar from "../../components/bottomBar/BottomBar";
import PageNav from "../../components/pageNav/PageNav";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]); // initial state: [] (haven't fetched any data yet)
  // useState: add state to components
  const [pages, setPages] = useState(1); // current pages
  const { search } = useLocation();
  const numPerPage = 4; // number of posts per page
  const postNum = useRef(null); // total number of the posts
  let numPage = null; // total number of pages
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    let initial = true;

    // useEffect: listen to the state changes
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      const allRes = await axiosInstance.get("/posts");
      postNum.current = allRes.data.length;
      if (initial) {
        setPosts(res.data.slice(0, numPerPage));
        initial = false;
      } else {
        setPosts(res.data);
      }
    };
    fetchPosts();
  }, [search]);

  if (postNum.current) {
    numPage = Math.ceil(postNum.current / numPerPage);
  }

  return (
    <>
      <Header />
      <div className="home">
        <div className="mainPageWrapper">
          <Posts posts={posts} />
          <Sidebar />
        </div>
        <PageNav pages={pages} setPages={setPages} numPage={numPage} />
        <BottomBar />
      </div>
    </>
  );
}
