import { Routes, Route, Outlet, Navigate } from "react-router";
import { AuthForm } from "../components/authform/AuthForm";
import { Home } from "../components/home/Home";
import { SignUpForm } from "../components/signupform/SignUpForm";
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../provider/authProvider";
import { Post } from "../components/post/post";

const NonAuthRoutes = () => {
    const { token } = useAuth()
    return (
        token ? <Navigate to='/' /> : <Outlet />
    )
}

// how to make it so if the user is already logged in then it redirects the page 
export const routes =
    <Routes>
        <Route element={<ProtectedRoute />}>
            <Route path="/welcome" element={<>Hello Welcome User!</>} />
            <Route path="/posts/:postId" element={<Post/>} />
        </Route>

        <Route element={<NonAuthRoutes />}>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<AuthForm />} />
        </Route>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<>About us</>} />

    </Routes>

export const RouteSwitcher = () => {
    return (
        routes
    );
}


// //note 
// // <Layout><Childre/></Layout>