import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import BottomBar from "../../components/bottomBar/BottomBar";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      <div className="mainSingleWrapper">
        <SinglePost />
        <Sidebar />
      </div>
      <BottomBar />
    </div>
  );
}
