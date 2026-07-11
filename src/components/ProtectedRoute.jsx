import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
