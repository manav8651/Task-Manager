import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const RequireAuth = () => {

    const authData = useSelector((state) => state.auth);
    console.log('reqauth: ' , authData)

    if (authData?.role) {
        // if the user is logged in, then only auth data will be present in the state
        // then only we want them to go to the dashboard
        return <Outlet  />
    } else {

        // if the user is not logged in, still try to access dashboard, 
        // then we want them to redirect to the login page
        return <Navigate to='/' />
    }

}

export default RequireAuth;