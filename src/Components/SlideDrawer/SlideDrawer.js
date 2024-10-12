import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SlideDrawer = ({ show, onRouteChange }) => {
    const [userData, setUserData] = useState(null);
    const [photoURL, setPhotoURL] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    );

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user);
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
        }
    }, [userData]);

    const drawerClasses = show ? 'side-drawer open' : 'side-drawer';

    const styles = {
        sideDrawer: {
            height: '100%',
            background: '#ffffff',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '30%',
            zIndex: 200,
            boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.5)',
            transform: show ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-out',
            padding: '2cm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            width: '20vw',  // Avatar will resize to 20% of the viewport width
            height: '20vw',
            maxWidth: '300px', // Limit the maximum size
            maxHeight: '300px',
            minWidth: '100px',  // Limit the minimum size for very small screens
            minHeight: '100px',
            marginBottom: '1cm',
            border: '2px solid #1db954', // Spotify-like green border for the avatar
        },
        button: {
            padding: '1.5vw', // Padding responsive to viewport width
            cursor: 'pointer',
            fontSize: '2vw', // Font size responsive to viewport width
            backgroundColor: '#1db954', // Spotify-like green background
            color: '#ffffff', // White text color
            border: 'none',
            width: '100%',
            marginBottom: '2vw', // Spacing responsive to viewport width
            borderRadius: '5px', // Rounded corners
            transition: 'background-color 0.3s, transform 0.2s', // Smooth transition effects
        },
        buttonHover: {
            backgroundColor: '#1aa34b', // Darker green on hover
            transform: 'scale(1.05)', // Slightly enlarge button on hover
        },
    };

    return (
        <div style={styles.sideDrawer}>
            <Avatar
                style={styles.avatar}
                alt="User Photo"
                src={photoURL}
            />
            <button
                style={styles.button}
                onClick={() => onRouteChange('myprofile')}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1aa34b')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1db954')}
            >
                Profile
            </button>
            <button
                style={styles.button}
                onClick={() => {
                    // Functionality to sign out (implement as needed)
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1aa34b')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1db954')}
            >
                Sign Out
            </button>
        </div>
    );
};

export default SlideDrawer;
