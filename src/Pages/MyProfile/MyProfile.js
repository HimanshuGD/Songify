import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { upload } from '../../Firebase/firebase-config';
import { Avatar } from '@material-ui/core';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);
    const [photo, setPhoto] = useState(null);
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
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return;

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

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleClick = () => {
        upload(photo, userData, setLoading);
    };

    useEffect(() => {
        if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
        }
    }, [userData]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5vw', padding: '2cm' }}>My Profile</h1>
            <div>
                {userData ? (
                    <div>
                        <Avatar
                            style={{ width: '40vw', height: '40vw', maxWidth: '350px', maxHeight: '350px', margin: '0 auto', border: '2px solid #1db954' }}
                            alt="User Photo"
                            src={photoURL}
                        />
                        <input
                            style={{ fontSize: '1.5vw', marginTop: '1cm', cursor: 'pointer' }}
                            type="file"
                            onChange={handleChange}
                        />
                        <button
                            style={{
                                fontSize: '1.5vw',
                                margin: '1cm',
                                backgroundColor: loading ? 'gray' : '#1db954',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0.2cm',
                                borderRadius: '5px',
                                border: 'none'
                            }}
                            disabled={loading || !photo}
                            onClick={handleClick}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>

                        <p style={{ fontSize: '1.5vw' }}> Email : {userData.email}</p>
                        <p style={{ fontSize: '1.5vw' }}> Last Login on : {userData.metadata.lastSignInTime}</p>
                        <p style={{ fontSize: '1.5vw', paddingBottom: '20px' }}>Joined on : {new Date(userData.metadata.creationTime).toLocaleString()}</p>

                        <button
                            style={{
                                padding: '0.3cm',
                                backgroundColor: 'red',
                                fontSize: '1.5vw',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default MyProfile;
