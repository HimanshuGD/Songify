import React, { useEffect, useState } from 'react';
import './SlideDrawer.css';
import Avatar from '@material-ui/core/Avatar';
import logo from '../Album/image/bts.jpg';
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { upload } from '../../Firebase/firebase-config';

const SlideDrawer = ({ show, onRouteChange }) => {
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

    let drawerClasses = 'side-drawer';
    if (show) {
        drawerClasses = 'side-drawer open';
    }
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
        <div className={drawerClasses} style={{ padding: '1cm' }} >
            <Avatar style={{ width: '350px', height: '350px', margin: '0 auto' }} alt="User Photo" src={photoURL} />
            <button style={{ paddingTop: '1cm', cursor: 'pointer', fontSize: '1cm', backgroundColor: 'white', border: 'none' }} 
            onClick={() => onRouteChange('myprofile')}>Profile</button>
            <br/>
            <button style={{ padding: '1cm', cursor: 'pointer', fontSize: '1cm', backgroundColor: 'white', border: 'none' }} 
            onClick={() => onRouteChange('signout')}>Sign out</button>
            <br/>
        </div>
    );
}

export default SlideDrawer;

