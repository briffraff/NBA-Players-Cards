import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser as firebaseDeleteUser
}
    from "firebase/auth";

import { auth } from "../firebase-config";


export const registerUser = async (username, email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: username,
        })
        return { user: userCredentials.user };
    } catch (error) {
        let errorMessage = "";
        switch (error.message) {
            case "Firebase: Error (auth/missing-email).":
                errorMessage = "Email cannot be empty";
                break;
            case "Firebase: Error (auth/missing-password).":
                errorMessage = "Missing password";
                break;
            case "Firebase: Error (auth/email-already-in-use).":
                errorMessage = "Email already in use";
                break;
            case "Firebase: Error (auth/invalid-email).":
                errorMessage = "Invalid email address";
                break;
            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                errorMessage = "Weak password";
                break;
            default:
                errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const reAuthentication = async (user) => {
    try {
        const password = prompt('Please enter your password for re-authentication:');
        if (!password) {
            throw new Error('Missing password');
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

    } catch (error) {
        let errorMessage = "";
        switch (error.code) {
            case "auth/invalid-credential":
                errorMessage = "Invalid credentials";
                break;
            case "auth/too-many-requests":
                errorMessage = "Too many failed login attempts. Account is temporarily disabled!";
                break;
            default:
                errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const deleteUser = async (user) => {
    try {
        await firebaseDeleteUser(user);
        console.log('User deleted successfully');
    } catch (error) {
        throw new Error(error.code);
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredentials.user };
    }
    catch (error) {
        let errorMessage = "";
        console.log(errorMessage);
        switch (error.message) {
            case "Firebase: Error (auth/invalid-email).":
                errorMessage = "Invalid email address";
                break;
            case "Firebase: Error (auth/missing-password).":
                errorMessage = "Missing password";
                break;
            case "Firebase: Error (auth/invalid-credential).":
                errorMessage = "Invalid credentials";
                break;
            case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                errorMessage = "Too many failed login attemps. Account is temporarily disabled!";
                break;
            default:
                errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.log("Error signing out:", error.message);
        throw new Error("Error signing out");
    }
};
