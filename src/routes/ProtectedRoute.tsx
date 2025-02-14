import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
    const { token } = useAuth();
    
    return (
        token ? <Outlet/> : <Navigate to='/login' />
        
    )
  };
  