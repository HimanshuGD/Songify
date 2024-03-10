import React, { useEffect, useState } from 'react';
import './SlideDrawer.css';
import Avatar from '@material-ui/core/Avatar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SlideDrawer = ({ show, onRouteChange }) => {
    const [userData, setUserData] = useState(null);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    
    function reloadPage() {
        window.location.reload();
    }

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
            onClick={reloadPage}>Sign out</button>
            <br/>
        </div>
    );
}

export default SlideDrawer;


