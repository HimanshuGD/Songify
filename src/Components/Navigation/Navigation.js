import React from 'react';
import './navigation.css';
import logo from '../../assets/logo.jpeg';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <div className='nav1' style={{ position: 'fixed' }} >  
                <nav style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="mr3 mb3" src={logo} alt='' style={{ width: '3cm', padding: '0.3cm' }} />
                        <h1 style={{ fontSize: '1cm', padding: '0.5cm', margin: 0 }}>Songify</h1>
                    </div>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick={() => onRouteChange('home')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>Home</p>
                        <p onClick={() => onRouteChange('about')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>About</p>
                        <p onClick={() => onRouteChange('signout')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}>Sign Out</p>
                    </nav>
                </nav>
            </div>
        );
    } else {
        return (
            <div className='nav2' style={{ position:'fixed' }} >
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="mr3 mb3" src={logo} alt='' style={{ width: '3cm', padding: '0.3cm' }} />
                        <h1 style={{ fontSize: '1cm', padding: '0.5cm', margin: 0 }}>Songify</h1>
                    </div>
                    <nav className='flex-end' style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <p onClick={() => onRouteChange('signin')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ fontSize: '0.7cm', paddingRight: '0.3cm', cursor: 'pointer' }}>
                            Sign In
                        </p>
                        <p onClick={() => onRouteChange('register')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ fontSize: '0.7cm', paddingRight: '0.3cm', cursor: 'pointer' }} >
                            Register
                        </p>
                    </nav>
                </nav>
            </div>

        );
    }
}

export default Navigation;


