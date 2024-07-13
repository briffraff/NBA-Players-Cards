import NotFound from "../404/404";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { useState } from "react";
import { reAuthentication, deleteUser } from "../../service/firebase/authentication/auth-service";

export default function Profile() {

    const [error, setError] = useState();
    const navigate = useNavigate();
    const { profileId } = useParams();

    const auth = getAuth()
    const user = auth.currentUser;

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        try {
            await reAuthentication(user);
            await deleteUser(user);
            setError("");
            navigate('/logout');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            {user.uid == profileId
                ? (<section className="user-section">
                    <div className="user-section-info">
                        <div className="delete-user" onClick={handleDeleteUser}>Delete User</div>
                        <div className="user-info">
                            <div>Username : <a className="user-info-values">{user.displayName}</a></div>
                            <div>Email : <a className="user-info-values">{user.email}</a></div>
                            <div>Role : <a className="user-info-values">{user.role}</a></div>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="user-items">
                        <div className="user-items-topic">Your items :</div>
                        {/* List all cards created by user*/}
                    </div>

                    <div className="liked-items">
                        <div className="liked-items-topic">Items you liked :</div>
                        {/* List all cards created by user*/}
                    </div>

                    {/* ADMIN   -> */}
                    {/* All users */}
                </section>)

                : (<NotFound />)
            }
        </>
    )
}