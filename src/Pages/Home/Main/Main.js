import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import SignIn from '../../Signin/Signin.jsx';
import Register from '../../Register/Register.jsx';
import Navigation from '../../../Components/Navigation/Navigation.js';
import Home from '../Home/Home.js';
import Bts from '../../../Components/Album/BTS/BTS.js';
import Alan from '../../../Components/Album/Alan/aw.js';
import Eminem from '../../../Components/Album/Eminem/e.js';
import Fav from '../../../Components/Album/Fav./f.js';
import Hindi from '../../../Components/Album/Hindi/hin.js';
import Justin from '../../../Components/Album/Justin_B/jb.js';
import NCS from '../../../Components/Album/NCS/ncs.js';
import Taylor from '../../../Components/Album/Taylor_S/ts.js';
import Backdrop from '../../../Components/SlideDrawer/BackDrop.js';
import SlideDrawer from '../../../Components/SlideDrawer/SlideDrawer.js';
import About from '../About.js';
import MyProfile from '../../MyProfile/MyProfile.js';
import SearchBox from '../../../Components/SearchBox/SearchBox.js';


class App extends Component {
    state = {
        input: '',
        route: 'signin',
        isSignedIn: false,
        drawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen
        }));
    };

    backdropClickHandler = () => {
        this.setState({ drawerOpen: false });
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false });
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        } else if (route === 'myprofile' || route === 'about' || route === 'bts' || route === 'alan' || route === 'eminem' || route === 'justin' || route === 'fav' || route === 'ncs' || route === 'hindi' || route === 'taylor') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        
        const { isSignedIn, route, drawerOpen } = this.state;
        let backdrop;
        if (drawerOpen) {
            backdrop = <Backdrop close={this.backdropClickHandler} />;
        }
        let mainContent;
        switch (route) {
            case 'home':
                mainContent = <Home toggle={this.drawerToggleClickHandler} route={route} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />;
                break;
            case 'signin':
                mainContent = <SignIn onRouteChange={this.onRouteChange} />;
                break;
            case 'register':
                mainContent = <Register onRouteChange={this.onRouteChange} />;
                break;
            case 'bts':
                mainContent = <Bts />;
                break;
            case 'myprofile':
                mainContent = <MyProfile />;
                break;
            case 'alan':
                mainContent = <Alan />;
                break;
            case 'about':
                mainContent = <About />;
                break;
            case 'eminem':
                mainContent = <Eminem />;
                break;
            case 'justin':
                mainContent = <Justin />;
                break;
            case 'fav':
                mainContent = <Fav />;
                break;
            case 'ncs':
                mainContent = <NCS />;
                break;
            case 'hindi':
                mainContent = <Hindi />;
                break;
            case 'taylor':
                mainContent = <Taylor />;
                break;
            default:
                mainContent = <Home />;
                break;
        }
        return (
            <div className="App">
                <ParticlesBg type="particles-js" bg={true} color="blue" style={{ innerHeight: '100%', outerHeight: '100%' }} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                <SlideDrawer onRouteChange={this.onRouteChange} show={drawerOpen} />
                {backdrop}
                {mainContent}
            </div>
        );
    }
}

export default App;
