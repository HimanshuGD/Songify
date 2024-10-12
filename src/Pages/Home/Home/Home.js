import React, { useEffect, useState } from 'react';
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
import SearchBox from '../../../Components/SearchBox/SearchBox.js';
import { FaArrowRight } from 'react-icons/fa'; // Importing the icon

// Song data for search functionality
const songs = [
    { name: 'BTS', image: BTSImage, route: 'bts' },
    { name: 'Alan Walker', image: AlanWalkerImage, route: 'alan' },
    { name: 'Eminem', image: EminemImage, route: 'eminem' },
    { name: 'Favorite', image: FavoritesImage, route: 'fav' },
    { name: 'Hindi', image: HindiImage, route: 'hindi' },
    { name: 'NCS', image: NCSImage, route: 'ncs' },
    { name: 'Justin Bieber', image: JustinBieberImage, route: 'justin' },
    { name: 'Taylor Swift', image: TaylorSwiftImage, route: 'taylor' },
];

const Home = ({ onRouteChange, toggle }) => {
    const [searchfield, setSearchfield] = useState('');
    const [filteredSongs, setFilteredSongs] = useState(songs); // Initialize with all songs

    // Filter songs based on search input
    useEffect(() => {
        setFilteredSongs(
            songs.filter(song =>
                song.name.toLowerCase().includes(searchfield.toLowerCase())
            )
        );
    }, [searchfield]);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    return (
        <div className="home-content" style={{ paddingTop: '50px'}}>
            <SearchBox searchfield={searchfield} searchChange={onSearchChange} />

            <div className="card-container" style={{ padding: "10vh", display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
                <div
                    className='slide-drawer'
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#1db954', // Spotify-like green
                        borderRadius: '10px',
                        padding: '10px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.3s',
                    }}
                >
                    <button
                        onClick={toggle}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#fff', // White color for the icon
                            fontSize: '24px', // Increase icon size
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1aa34b')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <FaArrowRight />
                    </button>
                </div>

                <div>
                    <ChatSymbol />
                </div>

                {filteredSongs.map((song, index) => (
                    <div className='card' key={index} onClick={() => onRouteChange(song.route)}>
                        <div className="div">
                            <img src={song.image} alt={song.name} className="card-image" />
                            <p className="caption">{song.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
