import NotFound from "../404/404";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestoreUserById } from "../../service/firebase/firestore/firestore-service";
import { auth } from "../../service/firebase/firebase-config";

import DeleteUserConfirmation from "./DeleteUserConfirmation";
import MiniCard from "../Cards/MiniCard";
import { getAllCardsByUser } from "../../service/firebase/firestore/firestore-service";

export default function Profile() {
    const user = auth.currentUser;
    const [userFirestore, setUserFirestore] = useState({});
    const { profileId } = useParams();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [cardsByUser, setCardsByUser] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        if (userFirestore.uid) {
            const fetchCardsByUser = async () => {
                try {
                    const cards = await getAllCardsByUser(userFirestore.uid, { signal: abortController.signal });
                    setCardsByUser(cards);
                } catch (error) {
                    console.log("Error fetching cards: ", error);
                }
            };

            fetchCardsByUser();

            return () => {
                abortController.abort();
            }
        }
    }, [userFirestore.uid]);

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
    }, [profileId]);


    const handleRole = `${userFirestore.admin === true ? "ADMIN" : "USER"}`;

    return (
        <>
            {user.uid === userFirestore.uid && profileId
                ? (<section className="user-section">
                    <div className="header-container">
                        <div className="slogan">
                            {handleRole} PROFILE
                        </div>
                        <div className="user-info">
                            <div>Username: <a className="user-info-values">{user.displayName}</a></div>
                            <div>Email: <a className="user-info-values">{user.email}</a></div>
                            <div>Role: <a className="user-info-values">{handleRole}</a></div>
                        </div>
                    </div>
                    <div className="button-container">
                        <Link to="/card-create" className="create-card-btn">Create Card</Link>

                        {userFirestore.admin == true &&                        
                        <div className="delete-user" onClick={() => setShowAdminDeleteUsers(true)}></div>}

                        <div className="delete-user" onClick={() => setShowDeleteConfirm(true)}>Delete Account</div>
                    </div>
                    <div className="user-items-topic">Your items :</div>
                    <div className="user-items">
                        {cardsByUser.length > 0 ? (
                            cardsByUser.map((card) => (
                                <MiniCard key={card.id} card={card} />
                            ))
                        ) : (
                            <p className="no-items">No items found.</p>
                        )}
                    </div>

                    <div className="liked-items-topic">Items you liked :</div>
                    <div className="liked-items">
                        {null ? (null) : (
                            <p className="no-items">No items found.</p>
                        )}
                    </div>

                    {/* ADMIN -> */}
            {/* All users */}
        </section >)
                : (<NotFound />)
}

{
    showDeleteConfirm &&
    <DeleteUserConfirmation
        setShowDeleteConfirm={setShowDeleteConfirm}
        userAuth={user}
        userFirestore={userFirestore} />
}
        </>
    )
}
