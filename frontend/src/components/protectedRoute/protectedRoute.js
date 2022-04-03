// import { is } from 'express/lib/request';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated, client } = useSelector((state) => state.client);
    // console.log("protected route running")
    return (
        <Fragment>
            {loading === false && (

                < Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticated) {
                            { console.log("not authenticated") }
                            return <Redirect to="/" />
                        }
                        return <Component {...props} />;
                    }}
                />

            )}
        </Fragment>
    )
}

export default ProtectedRoute