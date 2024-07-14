import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("Token");

  if (!token) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
