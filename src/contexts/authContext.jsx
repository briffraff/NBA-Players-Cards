import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../service/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestoreUserById } from '../service/firebase/firestore/firestore-service';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [firestoreUser, setFirestoreUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const firestoreUser = await getFirestoreUserById(user.uid);
                    setFirestoreUser({ ...firestoreUser });
                    setCurrentUser({ ...user });
                    setUserLoggedIn(true);
                } catch (error) {
                    console.log("Error fetching Firestore user: ", error);
                    setCurrentUser(user);
                    setFirestoreUser(null);
                }
            } else {
                setCurrentUser(null);
                setFirestoreUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        firestoreUser,
        currentUser,
        userLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
