import NotFound from "../404/404";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { reAuthentication, deleteUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";
import { getFirestoreUserById } from "../../service/firebase/firestore/firestore-service";

export default function Profile() {

    const [error, setError] = useState();
    const navigate = useNavigate();
    const { profileId } = useParams();
    const [userFirestore, setUserFirestore] = useState({});

    const authContext = useAuth();
    const authenticatedUser = authContext.currentUser;

    const handleDeleteUser = async (event) => {
        event.preventDefault();

        try {
            await reAuthentication(authenticatedUser);
            await deleteUser(authenticatedUser);
            setError("");
            navigate('/logout');
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userById = await getFirestoreUserById(profileId);
                setUserFirestore(userById);
                setError("");
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data");
            }
        };

        fetchUserData();
    }, [profileId]);

    return (
        <>
            {authenticatedUser && userFirestore.uid === profileId

                ? (<section className="user-section">
                    <div className="user-section-info">
                        <div className="delete-user" onClick={handleDeleteUser}>Delete User</div>
                        <div className="user-info">
                            <div>Username : <a className="user-info-values">{authenticatedUser.displayName}</a></div>
                            <div>Email : <a className="user-info-values">{userFirestore.email}</a></div>
                            <div>Role : <a className="user-info-values">{`${userFirestore.admin === true ? "Admin" : "User"}`}</a></div>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="user-items">
                        <div className="user-items-topic">Your items :</div>
                        {/* List all cards created by user*/}
                    </div>

                    <div className="liked-items">
                        <div className="liked-items-topic">Items you liked :</div>
                        {/* List all cards liked by user*/}
                    </div>

                    {/* ADMIN   -> */}
                    {/* All users */}
                </section>)

                : (<NotFound />)
            }
        </>
    )
}
