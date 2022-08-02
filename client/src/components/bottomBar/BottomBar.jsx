import "./bottomBar.css";
import { Link } from "react-router-dom";

export default function BottomBar() {
  return (
    <div className="bottomBar">
      <div className="motto">「Every word matters!」</div>
      <span className="author">
        Designed and Built by&nbsp;
        {
          <Link
            className="link easterEgg"
            to={{ pathname: "https://fulcrum.cool/" }}
            target="_blank"
          >
            Fulcrum
          </Link>
        }
        &nbsp;© 2022
      </span>
      <span className="thanks">
        Many thanks to&nbsp;
        <Link
          className="link easterEgg"
          to={{ pathname: "http://lyons.press" }}
          target="_blank"
        >
          Promising
        </Link>
      </span>
    </div>
  );
}
