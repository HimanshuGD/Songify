import React, { useEffect, useState, useRef, useCallback } from "react";
import { tracks } from "./track";
import './bts.css';
import player from './playing.gif';
import bck from './bts_logo.jpeg';
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
    const [audioPlaying, setAudioPlaying] = useState(false);

    const audioRef = useRef();
    const progressBarRef = useRef();

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
        audioRef.current.pause();
        const newAudio = new Audio(tracks[trackIndex].src);
        audioRef.current = newAudio;

        audioRef.current.play().catch((error) => {
            console.error('Error while playing the audio:', error);
        });
        setIsPlaying(true);
    };


    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    };

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes =
                minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds =
                seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };

    const makeAllPlays = () => {
        const playIcons = document.getElementsByClassName('songItemPlay');
        Array.from(playIcons).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
    };

    const playSong = (index) => {
        makeAllPlays();
        setTrackIndex(index);
        setCurrentTrack(tracks[index]);
        setAudioPlaying(true);

        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }

        const newAudio = new Audio(tracks[index].src);

        audioRef.current = newAudio;
        audioRef.current.play().catch((error) => {
            console.error('Error while playing the audio:', error);
        });

        setIsPlaying(true);

        const playIcon = document.getElementById(index.toString());
        if (playIcon) {
            playIcon.classList.remove('fa-play-circle');
            playIcon.classList.add('fa-pause-circle');
        }
    };




    return (
        <>
            <div style={{ paddingTop:'2cm' }}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                <div className="container" 
                style={{
                    paddingTop: '2cm', backgroundImage: `url(${ bck })`,
                    backgroundSize: 'cover', backgroundPosition: 'center'
                    }}>
                    <div className="songList">
                        <h1>Best of BTS</h1>
                        <div className="songItemContainer">
                            {tracks.map((song, index) => (
                                <div className="songItem" key={index}>
                                    <img alt={index} src={song.thumbnail} />
                                    <span className="songName">{song.title}</span>
                                    <span className="songlistplay">
                                        <span className="timestamp"> {' '}
                                            <i
                                                id={index.toString()}
                                                className={`far songItemPlay ${isPlaying && trackIndex === index ? 'fa-pause-circle' : 'fa-play-circle'}`}
                                                onClick={() => playSong(index)}
                                            ></i>{' '}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="display-track">
                    <audio
                        src={currentTrack.src}
                        ref={audioRef}
                        onLoadedMetadata={onLoadedMetadata}
                        onEnded={handleNext}
                    />
                    <div className="audio-info">
                        <div className="audio-image">
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
                                <IoPlaySkipBackSharp />
                            </button>
                            <button onClick={skipBackward}>
                                <IoPlayBackSharp />
                            </button>

                            <button onClick={togglePlayPause}>
                                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                            </button>
                            <button onClick={skipForward}>
                                <IoPlayForwardSharp />
                            </button>
                            <button onClick={handleNext}>
                                <IoPlaySkipForwardSharp />
                            </button>
                        </div>
                        <div className="volume">
                            <button onClick={() => setMuteVolume((prev) => !prev)}>
                                {muteVolume || volume < 5 ? (
                                    <IoMdVolumeOff />
                                ) : volume < 40 ? (
                                    <IoMdVolumeLow />
                                ) : (
                                    <IoMdVolumeHigh />
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
                        />
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BTS;


