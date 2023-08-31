import { useNavigate } from "react-router-dom";
import { signout } from "../context/helpers";

const style = {
  textAlign: "center",
};

const UserPage = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout(() => navigate("/"));
  };

  return (
    <div className="text-purple" style={style}>
      <h1>You are User!</h1>
      <p>Let maintainer allow to access the dashboard.</p>
      <input
        type="button"
        value="LOGOUT"
        className="btn-primary"
        onClick={handleSignOut}
      />
    </div>
  );
};

export default UserPage;
