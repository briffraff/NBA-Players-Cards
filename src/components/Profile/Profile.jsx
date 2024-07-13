import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"
import { getAuth, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import NotFound from "../404/404";

export default function Profile() {

    const navigate = useNavigate();
    const { profileId } = useParams();

    const auth = getAuth()
    const user = auth.currentUser;

    const handleDeleteUser = () => {
        if (user) {
            deleteUser(user).then(() => {
                console.log('User deleted successfully');
                navigate('/logout')
            }).catch((error) => {
                console.log('Error deleting user:', error);
                try {
                    reAuthentication()
                } catch (error) {

                }
            });
        } else {
            console.log('No user is signed in');
        }
    }

    const reAuthentication = () => {
        if (user) {
            const password = prompt('Please enter your password for re-authentication:');

            const credential = EmailAuthProvider.credential(user.email, password);

            reauthenticateWithCredential(user, credential).then(() => {
                return deleteUser(user);
            }).then(() => {
                console.log('User deleted successfully');
                navigate('/logout')
            }).catch((error) => {
                console.log('Error deleting user:', error);
            });
        } else {
            console.log('No user is signed in');
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