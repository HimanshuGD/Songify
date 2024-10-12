import React, { useEffect, useState, useRef, useCallback } from "react";
import { tracks } from "./track"; // Import your tracks data
import './bts.css';
import player from './playing.gif';
import bck from './covers/7.jpg';
import { BsMusicNoteBeamed } from "react-icons/bs";
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';
import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
} from 'react-icons/io';

function BTS() {
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    const audioRef = useRef();
    const progressBarRef = useRef();

    const handleNext = () => {
        let newTrackIndex = trackIndex + 1;
        if (newTrackIndex >= tracks.length) {
            newTrackIndex = 0; // Loop back to the first track
        }
        setTrackIndex(newTrackIndex);
        setCurrentTrack(tracks[newTrackIndex]);
        playSong(newTrackIndex); // Play the new track
    };

    const handlePrevious = () => {
        let newTrackIndex = trackIndex - 1;
        if (newTrackIndex < 0) {
            newTrackIndex = tracks.length - 1; // Loop back to the last track
        }
        setTrackIndex(newTrackIndex);
        setCurrentTrack(tracks[newTrackIndex]);
        playSong(newTrackIndex); // Play the new track
    };

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;

        if (duration) {
            progressBarRef.current.style.setProperty(
                '--range-progress',
                `${(progressBarRef.current.value / duration) * 100}%`
            );
        }
    }, [duration]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        const intervalId = setInterval(repeat, 1000); // Update every second
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [isPlaying, repeat]);

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, muteVolume]);

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };

    const playSong = (index) => {
        setTrackIndex(index);
        setCurrentTrack(tracks[index]);

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const newAudio = new Audio(tracks[index].src);
        audioRef.current = newAudio;
        audioRef.current.play().catch((error) => {
            console.error('Error while playing the audio:', error);
        });

        setIsPlaying(true);
    };

    return (
        <>
            <div style={{ paddingTop: '2cm' }}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                <div className="container" style={{
                    backgroundImage: `url(${bck})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    width: '100%', // Ensure the container takes full width
                    position: "fixed",
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* Static Heading */}
                    <h1>Best of BTS</h1> {/* Title outside of the scrollable area */}
                    <div className="songList" style={{ flex: 1 }}> {/* Song list now scrolls only */}
                        <div className="songItemContainer">
                            {tracks.map((song, index) => (
                                <div className="songItem" key={index}>
                                    <img alt={index} src={song.thumbnail} />
                                    <span className="songName">{song.title}</span>
                                    <span className="songlistplay">
                                        <span className="timestamp">
                                            <i
                                                className={`far songItemPlay ${isPlaying && trackIndex === index ? 'fa-pause-circle' : 'fa-play-circle'}`}
                                                onClick={() => playSong(index)}
                                            ></i>
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fixed Bottom Display and Controls */}
                    <div className="display-track">
                        <div>
                            <audio
                                src={currentTrack.src}
                                ref={audioRef}
                                onLoadedMetadata={onLoadedMetadata}
                                onEnded={handleNext}
                            />
                            <div className="audio-info">
                                <div className="audio-image" style={{ height: '200px', width: '200px' }} >
                                    {currentTrack.thumbnail ? (
                                        <img src={currentTrack.thumbnail} alt="audio avatar" />
                                    ) : (
                                        <div className="icon-wrapper">
                                            <span className="audio-icon">
                                                <BsMusicNoteBeamed />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text">
                                    <p className="title" style={{ fontSize: '1.4cm' }}>{currentTrack.title}</p>
                                    <p style={{ fontSize: '1cm' }}>{currentTrack.author}</p>
                                    {isPlaying && <img src={player} alt="player" className="player-gif" />}
                                </div>
                            </div>
                        </div>

                        <div className="controls">
                            <div className="controls-wrapper">
                                <div className="controls">
                                    <button onClick={handlePrevious}>
                                        <IoPlaySkipBackSharp style={{color: 'black'}} />
                                    </button>
                                    <button onClick={skipBackward}>
                                        <IoPlayBackSharp style={{ color: 'black' }} />
                                    </button>
                                    <button onClick={togglePlayPause}>
                                        {isPlaying ? <IoPauseSharp style={{ color: 'black' }} /> : <IoPlaySharp style={{ color: 'black' }} />}
                                    </button>
                                    <button onClick={skipForward}>
                                        <IoPlayForwardSharp style={{ color: 'black' }} />
                                    </button>
                                    <button onClick={handleNext}>
                                        <IoPlaySkipForwardSharp style={{ color: 'black' }} />
                                    </button>
                                </div>
                                <div className="volume">
                                    <button onClick={() => setMuteVolume((prev) => !prev)}>
                                        {muteVolume || volume < 5 ? (
                                            <IoMdVolumeOff style={{ color: 'black' }} />
                                        ) : volume < 40 ? (
                                                <IoMdVolumeLow style={{ color: 'black' }} />
                                        ) : (
                                                    <IoMdVolumeHigh style={{ color: 'black' }} />
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value)}
                                        style={{
                                            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="progressbar">
                            <div className="progress">
                                <span className="time current">{formatTime(timeProgress)}</span>
                                <input
                                    type="range"
                                    ref={progressBarRef}
                                    defaultValue="0"
                                    onChange={handleProgressChange}
                                    style={{
                                        background: `linear-gradient(to right, #f50 ${timeProgress / duration * 100}%, #ccc ${timeProgress / duration * 100}%)`,
                                    }}
                                />
                                <span className="time duration">{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BTS;
