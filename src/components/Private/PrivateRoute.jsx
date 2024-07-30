import React from 'react';
import { useAuth } from '../../contexts/authContext';
import NotFound from '../404/404';

export default function PrivateRoute({ element: Element, ...rest }) {
    const { userLoggedIn } = useAuth();

    return userLoggedIn ? <Element {...rest} /> : <NotFound />;
}
