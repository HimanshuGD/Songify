import React from 'react';
import logo from '../../assets/logo.jpeg';
import './navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    const reloadPage = () => {
        window.location.reload();
    };

    if (isSignedIn) {
        return (
            <div className='nav1' style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="mr3 mb3" src={logo} alt='Logo' style={{ width: '2cm', padding: '0.3cm' }} />
                        <h1 style={{ fontSize: '1.5rem', padding: '0.5cm', margin: 0 }}>Songify</h1>
                    </div>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick={() => onRouteChange('home')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>Home</p>
                        <p onClick={() => onRouteChange('about')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>About</p>
                        <p onClick={reloadPage}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>Sign Out</p>
                    </nav>
                </nav>
            </div>
        );
    } else {
        return (
            <div className='nav2' style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="mr3 mb3" src={logo} alt='Logo' style={{ width: '2cm', padding: '0.3cm' }} />
                        <h1 style={{ fontSize: '1.5rem', padding: '0.5cm', margin: 0 }}>Songify</h1>
                    </div>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick={() => onRouteChange('signin')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>
                            Sign In
                        </p>
                        <p onClick={() => onRouteChange('register')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>
                            Register
                        </p>
                    </nav>
                </nav>
            </div>
        );
    }
};

export default Navigation;
