import { useAuth } from "../../contexts/authContext"

export default function Profile() {

    const { currentUser, userLoggedIn, loading } = useAuth();

    return (
        <>
            <section className="user-section">
                <div className="user-section-info">
                    <div className="delete-user">Delete User</div>
                    <div className="user-info">
                        <div>Username : <a className="user-info-values">{currentUser.displayName}</a></div>
                        <div>Email : <a className="user-info-values">{currentUser.email}</a></div>
                        <div>Role : <a className="user-info-values">{currentUser.role}</a></div>
                    </div>
                </div>

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


            </section>
        </>
    )
}