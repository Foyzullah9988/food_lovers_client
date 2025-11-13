import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PublicRoutes = ({ children }) => {
    const { user } = use(AuthContext);
    const location = useLocation();

    if(user){
        return <Navigate to={location.state?.from?.pathname || '/'} replace/>
    }

    return children 
};

export default PublicRoutes;