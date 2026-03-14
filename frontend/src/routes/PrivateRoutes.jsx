import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  const user  = JSON.parse(sessionStorage.getItem("fittrack_user") || "{}");

  return token
    ? <Outlet context={{ userProfile: user }} />
    : <Navigate to="/" />;
};

export default PrivateRoutes;