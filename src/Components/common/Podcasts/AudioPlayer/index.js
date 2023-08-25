import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./style.css";
import { Form } from "react-router-dom";
const AudioPlayer = ({ audioSrc, Image }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const toggleMute = () => {
    setMute(!isMute);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  // useEffect(()=>{
  //   setDuration(audioRef.current.duration)
  // }, [audioRef])

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="custom-audio-player">
      <img src={Image} className="display-image-player" />
      <audio ref={audioRef} src={audioSrc} />
      <p className="audio-btn" onClick={togglePlay}>{isPlaying ? <FaPlay /> : <FaPause />}</p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          onChange={handleDuration}
          className="duration-range"
          max={duration}
          step={0.01}
          value={currentTime}
        />
        <p>{formatTime(duration - currentTime)}</p>
      </div>
      <p className="audio-btn" onClick={toggleMute}>{!isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
      <input
        type="range"
        onChange={handleVolume}
        className="volume-range"
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
};

export default AudioPlayer;
