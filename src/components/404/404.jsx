import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/">Go to Home</Link>
            </div>
        </>
    )
}