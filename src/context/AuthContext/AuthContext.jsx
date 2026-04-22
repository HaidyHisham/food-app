import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [loginData, setLoginData] = useState(null);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('userProfileImage'));

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Users/currentUser', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const imagePath = response?.data?.imagePath;
            setProfileImage(imagePath);
            localStorage.setItem('userProfileImage', imagePath);
        } catch (err) {
            console.error("Profile Fetch Error:", err);
        }
    };

    const saveLoginData = () => {
        const encodedToken = localStorage.getItem('token');
        if (encodedToken) {
            try {
                const decodedData = jwtDecode(encodedToken);
                setLoginData(decodedData);
                getCurrentUser();
            } catch (error) {
                console.error("Invalid Token:", error);
                localStorage.clear();
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveLoginData();
        }
    }, []); 

    return (
        <AuthContext.Provider value={{ loginData, profileImage, setLoginData, saveLoginData }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * AUTH CONTEXT SUMMARY:
 * ---------------------
 * 1. PERSISTENCE: It checks localStorage for a 'token' when the app first loads (useEffect).
 * 2. DECODING: It uses 'jwtDecode' to turn the encrypted token string into readable user data (loginData).
 * 3. SYNCING: The 'saveLoginData' function ensures the React State matches what is in the browser storage.
 * 4. API FETCH: 'getCurrentUser' calls the server to get the latest profile image using the Bearer token.
 * 5. GLOBAL SHARING: It provides 'loginData' and 'profileImage' to the entire app (Navbar, Sidebar, etc.).
 */