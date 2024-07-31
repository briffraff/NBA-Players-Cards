import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { auth } from "../../service/firebase/firebase-config";
import { getFirestoreUserById, getAllCardsByUser, getLikedTeamsByUser } from "../../service/firebase/firestore/firestore-service";

import NotFound from "../404/404";
import DeleteUserConfirmation from "./DeleteUserConfirmation";
import AdminManageUsersModal from "./AdminManageUsersModal";
import MiniCard from "../Cards/MiniCard";
import TeamThumbnail from "../Teams/TeamThumbnail";

import styles from "../../../public/assets/scss/modules/_Profile.module.scss"

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
                ? (<section className={styles.userSection}>
                    <div className={styles.headerContainer}>
                        <div className={styles.slogan}>
                            {handleRole} PROFILE
                        </div>
                        <div className={styles.userInfo}>
                            <div>Username: <a className={styles.userInfoValues}>{user.displayName}</a></div>
                            <div>Email: <a className={styles.userInfoValues}>{user.email}</a></div>
                            <div>Role: <a className={styles.userInfoValues}>{handleRole}</a></div>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to="/card-create" className={styles.createCardBtn}>Create Card</Link>

                        {userFirestore.admin == true &&
                            <div className={styles.manageUsers} onClick={() => setShowAdminManageUsers(true)}>Manage Users</div>}

                        <div className={styles.deleteUser} onClick={() => setShowDeleteConfirm(true)}>Delete Account</div>
                    </div>
                    <div className={styles.userItemsTopic}>Your cards :</div>
                    <div className={styles.userItems}>
                        {cardsByUser.length > 0 ? (
                            cardsByUser.map((card) => (
                                <MiniCard key={card.id} card={card} />
                            ))
                        ) : (
                            <p className={styles.noItems}>No cards found.</p>
                        )}
                    </div>

                    <div className={styles.likedItemsTopic}>Teams you liked :</div>
                    <div className={styles.likedItems}>

                        {likedTeams.length > 0 ? (
                            <div>
                                <div>
                                    {
                                        <div className={`${styles.teamsContainerFlexwrap} ${styles.bottomDistance} ${styles.sideDistance}`}>
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
                            <p className={styles.noItems}>No teams found.</p>
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
