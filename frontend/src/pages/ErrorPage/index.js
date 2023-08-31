import { Link } from "react-router-dom";

import "./index.scss";

const ErrorPage = () => {
  return (
    <section>
      <div className="notfoundContainer">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Page not found!</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-primary">
            Back To Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
