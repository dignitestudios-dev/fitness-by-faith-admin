import { useEffect } from "react";
// import { withRouter } from "react-router-dom";

// Component to scroll to the top of the page when navigating to a new route
const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default ScrollToTop;
