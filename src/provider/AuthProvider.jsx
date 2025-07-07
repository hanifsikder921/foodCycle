import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    // Logout User=====================>
    const logoutUser = () => {
        return signOut(auth)
    }

    // login with Google

    const googleSignin = () => {

        return signInWithPopup(auth, provider)
    }

    const updateDetails = (currentUser, { displayName, photoURL }) => {
        return updateProfile(currentUser, {
            displayName,
            photoURL
        });
    };





    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {

                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser?.email })
                    .then(res => {
                        localStorage.setItem('token', res.data.token)
                    });
            } else{
                localStorage.removeItem('token')
            }


            setLoading(false)
        });

        return () => unsubscribe();
    }, []);



  

    const authData = {
        createUser,
        loginUser,
        logoutUser,
        updateDetails,
        user,
        setUser,
        googleSignin,
        loading,
        setLoading,
        

    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
