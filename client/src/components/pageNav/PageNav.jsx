import "./pageNav.css";
import { Link } from "react-router-dom";

export default function PageNav(props) {
  const handleClick = async (page) => {
    try {
      await props.setPages(page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLeft = async () => {
    try {
      const currPage = props.pages;
      if (currPage > 1) {
        await props.setPages(currPage - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickRight = async () => {
    try {
      const currPage = props.pages;
      if (currPage < props.numPage) {
        await props.setPages(currPage + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pageNavBar">
      <nav className="pageNavBarWrapper">
        <Link
          className="link"
          to={`/?page=${props.pages > 1 ? props.pages - 1 : 1}`}
        >
          <div className="button side" onClick={() => handleClickLeft()}>
            &lt;
          </div>
        </Link>
        {props.pages === 1 ? (
          <div className="clickedButton">{props.pages}</div>
        ) : (
          <Link className="link" to={`/?page=1`}>
            <div className="button" onClick={() => handleClick(1)}>
              1
            </div>
          </Link>
        )}
        {props.numPage &&
          props.numPage >= 2 &&
          (props.pages === 2 ? (
            <div className="clickedButton">{props.pages}</div>
          ) : (
            <Link className="link" to={`/?page=2`}>
              <div className="button" onClick={() => handleClick(2)}>
                2
              </div>
            </Link>
          ))}
        {props.numPage &&
          props.numPage >= 3 &&
          (props.pages === 3 ? (
            <div className="clickedButton">{props.pages}</div>
          ) : (
            <Link className="link" to={`/?page=3`}>
              <div className="button" onClick={() => handleClick(3)}>
                3
              </div>
            </Link>
          ))}
        {props.numPage &&
          props.numPage >= 4 &&
          (props.pages === 4 ? (
            <div className="clickedButton">{props.pages}</div>
          ) : (
            <Link className="link" to={`/?page=4`}>
              <div className="button" onClick={() => handleClick(4)}>
                4
              </div>
            </Link>
          ))}
        {props.numPage &&
          props.numPage >= 5 &&
          (props.pages === 5 ? (
            <div className="clickedButton">{props.pages}</div>
          ) : (
            <Link className="link" to={`/?page=5`}>
              <div className="button" onClick={() => handleClick(5)}>
                5
              </div>
            </Link>
          ))}
        <Link
          className="link"
          to={`/?page=${
            props.pages < props.numPage ? props.pages + 1 : props.numPage
          }`}
        >
          <div className="button side" onClick={() => handleClickRight()}>
            &gt;
          </div>
        </Link>
      </nav>
    </div>
  );
}
