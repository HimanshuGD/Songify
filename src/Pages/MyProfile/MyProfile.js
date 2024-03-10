import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import {upload} from '../../Firebase/firebase-config';
import { Avatar } from '@material-ui/core';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const[photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    
        
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user);
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserData = async (user) => {
        try {
            setUserData(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await deleteUser(currentUser);
                setUserData(null);
                console.log("User account deleted successfully.");
            } else {
                console.error("No user is currently signed in.");
            }
        } catch (error) {
            console.error("Error deleting user account:", error);
        }
    };

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function handleClick() {
        upload(photo, userData, setLoading);
    }

    useEffect(() => {
        if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
        }
    }, [userData])

    return (
        <>
            <div style={{ paddingTop: '3cm' }}>
                <h1 style={{ fontSize: '1.5cm', padding: '2cm' }}>My Profile</h1>
                <div>
                    {userData ? (
                        <div>
                            <Avatar style={{ width: '350px', height: '350px', margin: '0 auto' }} alt="User Photo" src={photoURL} />
                            <input style={{ fontSize: '1cm', cursor:'pointer' }} type="file" onChange={handleChange} />
                            <button style={{ fontSize: '1cm', cursor:'pointer' }} disabled={loading || !photo} onClick={handleClick}>Upload</button>

                            <p style={{ fontSize: '1cm', paddingTop: '3cm' }} > Email : {userData.email}</p>
                            <p style={{ fontSize: '1cm' }} > Last Login on : {userData.metadata.lastSignInTime}</p>
                            <p style={{ fontSize: '1cm', paddingBottom: '3cm' }} >Joined on : {new Date(userData.metadata.creationTime).toLocaleString()}</p>
                            <button 
                            style={{ padding: '2mm', backgroundColor: 'red', fontSize: '1cm', cursor: 'pointer' }}
                            onClick={handleDeleteAccount}>
                                Delete Account</button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyProfile;
