import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (location.pathname === "/shop/home") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    if (!(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  if (isAuthenticated && location.pathname === "/auth/register") {
    return <Navigate to="/shop/home" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
