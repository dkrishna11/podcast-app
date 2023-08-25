import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../fireBase";
import Loader from "./Loader";


const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loader />;
  else if (!user || error) return <Navigate to="/" replace />;
  else return <Outlet />;
};

export default PrivateRoutes
