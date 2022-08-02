import "./post.css";
import NabooFighter from "../../images/naboo_fighter.jpg";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // const PF = "http://localhost:5000/images/";
  const PF = "http://106.14.199.28:5000/images/";
  return (
    <div className="postWrapper">
      <Link to={`/post/${post._id}`} className="link">
        <div className="post">
          {post.photo ? (
            <img className="postImg" src={PF + post.photo} alt="" />
          ) : (
            <img className="postImg" src={NabooFighter} alt="" />
          )}
          <div className="postInfo">
            <div className="postTitle">{post.title}</div>
            <div className="postDateNUsername">
              <div className="postUsername">{post.username}</div>
              <div className="postDate">
                {new Date(post.createdAt).toDateString()}
              </div>
            </div>
          </div>
          <p className="postDesc">{post.desc}</p>
        </div>
      </Link>
    </div>
  );
}
