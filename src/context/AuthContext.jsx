import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(PU => user);
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <AuthContext.Provider value={ {currentUser} }>
            {children}
        </AuthContext.Provider>
    );

}