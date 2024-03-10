import React from 'react';

import './Home.css';
import BTSImage from '../../../Components/Album/image/bts.jpg';
import AlanWalkerImage from '../../../Components/Album/image/aaw.jpeg';
import EminemImage from '../../../Components/Album/image/Eminem.jpg';
import HindiImage from '../../../Components/Album/image/hindi.jpg';
import FavoritesImage from '../../../Components/Album/image/Fav.jpg';
import JustinBieberImage from '../../../Components/Album/image/jusb.jpg';
import TaylorSwiftImage from '../../../Components/Album/image/taylor.jpg';
import NCSImage from '../../../Components/Album/image/NCS.jpg';
import ChatSymbol from '../../../Components/Chatbot/ChatSymbol';


const Home = ({ onRouteChange, toggle}) => {

    return (
        <div className="home-content" >
            <div className="card-container" style={{ padding: "10vh", display: 'flex', flexWrap: 'wrap', justifyContent: "center" }} >
                <div className='slide-drawer' style={{ position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)' }} >
                    <button onClick={toggle} style={{ backgroundColor: 'transparent', border: 'none' }} >
                        <h1 style={{ position:'fixed', fontSize: '2cm', color:'black', cursor: 'pointer' }}> &gt; </h1>
                    </button>
                </div>

                <div>
                    <ChatSymbol />
                </div>

                <div className='card' onClick={() => onRouteChange('bts')}>
                    <div className="div">
                        <img src={BTSImage} alt="BTS" className="card-image" />
                        <p className="caption">BTS</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('alan')}>
                    <div className="div">
                        <img src={AlanWalkerImage} alt="alan" className="card-image" />
                        <p className="caption">Alan Walker</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('eminem')}>
                    <div className="div">
                        <img src={EminemImage} alt="eminem" className="card-image" />
                        <p className="caption">Eminem</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('fav')}>
                    <div className="div">
                        <img src={FavoritesImage} alt="fav" className="card-image" />
                        <p className="caption">Favourite</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('hindi')}>
                    <div className="div">
                        <img src={HindiImage} alt="hindi" className="card-image" />
                        <p className="caption">Hindi</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('ncs')}>
                    <div className="div">
                        <img src={NCSImage} alt="ncs" className="card-image" />
                        <p className="caption">NCS</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('justin')}>
                    <div className="div">
                        <img src={JustinBieberImage} alt="justin" className="card-image" />
                        <p className="caption">Justin Bieber</p>
                    </div>
                </div>
                <div className='card' onClick={() => onRouteChange('taylor')}>
                    <div className="div">
                        <img src={TaylorSwiftImage} alt="taylor" className="card-image" />
                        <p className="caption">Taylor Swift</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;


