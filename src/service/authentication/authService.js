import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const registerUser = async (email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
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
        console.error("Error signing out:", error.message);
        throw new Error("Error signing out");
    }
};