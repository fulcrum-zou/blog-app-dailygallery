import "./header.css";
import Grass from "../../images/grass.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Just a simple</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImage" src={Grass} alt="" />
    </div>
  );
}
