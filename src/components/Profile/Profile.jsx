import NotFound from "../404/404";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestoreUserById } from "../../service/firebase/firestore/firestore-service";
import { auth } from "../../service/firebase/firebase-config";

import DeleteUserConfirmation from "./DeleteUserConfirmation";

export default function Profile() {

    const user = auth.currentUser;
    const [userFirestore, setUserFirestore] = useState({});
    const { profileId } = useParams();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userById = await getFirestoreUserById(profileId);
                setUserFirestore(userById);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [profileId, user]);

    return (
        <>
            {user.uid === userFirestore.uid && profileId

                ? (<section className="user-section">
                    <div className="user-section-info">
                        <div className="delete-user" onClick={() => setShowDeleteConfirm(true)}>Delete Account</div>
                        <div className="user-info">
                            <div>Username : <a className="user-info-values">{user.displayName}</a></div>
                            <div>Email : <a className="user-info-values">{user.email}</a></div>
                            <div>Role : <a className="user-info-values">{`${userFirestore.admin === true ? "Admin" : "User"}`}</a></div>
                        </div>
                    </div>

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

            {showDeleteConfirm && <DeleteUserConfirmation setShowDeleteConfirm={setShowDeleteConfirm} user={user} />}
        </>
    )
}
