import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestoreUserById, getAllCardsByUser, getLikedTeamsByUser } from "../../service/firebase/firestore/firestore-service";
import { auth } from "../../service/firebase/firebase-config";

import NotFound from "../404/404";
import DeleteUserConfirmation from "./DeleteUserConfirmation";
import AdminManageUsersModal from "./AdminManageUsersModal";
import MiniCard from "../Cards/MiniCard";
import TeamThumbnail from "../Teams/TeamThumbnail";


export default function Profile() {
    const user = auth.currentUser;
    const [userFirestore, setUserFirestore] = useState({});
    const { profileId } = useParams();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAdminManageUsers, setShowAdminManageUsers] = useState(false);
    const [cardsByUser, setCardsByUser] = useState([]);
    const [likedTeams, setLikedTeams] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        if (userFirestore.uid) {
            const fetchCardsByUser = async () => {
                try {
                    const cards = await getAllCardsByUser(userFirestore.uid, { signal: abortController.signal });
                    setCardsByUser(cards);

                    const likedTeamsIds = userFirestore.likedTeams;
                    const likes = await getLikedTeamsByUser(likedTeamsIds);
                    setLikedTeams(likes);
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
                            <div className="manage-users" onClick={() => setShowAdminManageUsers(true)}>Manage Users</div>}

                        <div className="delete-user" onClick={() => setShowDeleteConfirm(true)}>Delete Account</div>
                    </div>
                    <div className="user-items-topic">Your cards :</div>
                    <div className="user-items">
                        {cardsByUser.length > 0 ? (
                            cardsByUser.map((card) => (
                                <MiniCard key={card.id} card={card} />
                            ))
                        ) : (
                            <p className="no-items">No cards found.</p>
                        )}
                    </div>

                    <div className="liked-items-topic">Teams you liked :</div>
                    <div className="liked-items">

                        {likedTeams.length > 0 ? (
                            <div className="teams-container-flexwrap">
                                <div>
                                    {
                                        <div className="teams-container-flexwrap bottomDistance sideDistance">
                                            {
                                                likedTeams.map((team) => (
                                                    <TeamThumbnail key={team.id} team={team} />
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <p className="no-items">No teams found.</p>
                        )}
                    </div>

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

            {/* ADMIN -> */}
            {/* All users */}
            {
                showAdminManageUsers &&
                <AdminManageUsersModal
                    setShowAdminManageUsers={setShowAdminManageUsers}
                />
            }
        </>
    )
}
