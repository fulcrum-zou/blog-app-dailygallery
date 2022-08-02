import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="postsWrapper">
      <div className="posts">
        {posts.map((p) => (
          <Post post={p} />
        ))}
      </div>
    </div>
  );
}
