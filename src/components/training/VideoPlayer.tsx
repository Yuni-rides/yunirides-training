"use client";
import React, { useRef, useState, useEffect } from 'react';

interface Props {
  videoUrl: string;
  lastSavedTime: number;
  onProgressUpdate: (seconds: number) => void;
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, lastSavedTime, onProgressUpdate, onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // useRef use karenge max time track karne ke liye taake re-render na ho (No Glitch)
  const maxTimeRef = useRef(lastSavedTime);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (videoRef.current && isInitialLoad.current) {
      videoRef.current.currentTime = lastSavedTime;
      maxTimeRef.current = lastSavedTime;
      isInitialLoad.current = false;
    }
  }, [lastSavedTime]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // 1. ANTI-SKIP LOGIC: Agar jump karein toh foran piche phenk dein
    if (currentTime > maxTimeRef.current + 2) {
      video.currentTime = maxTimeRef.current;
    } else {
      // Agar normal chal rahi hai, toh progress update karein
      if (currentTime > maxTimeRef.current) {
        maxTimeRef.current = currentTime;
        
        // Parent ko har second update bhejte rahein lekin state slow update karein
        if (Math.floor(currentTime) % 2 === 0) {
           onProgressUpdate(currentTime);
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center min-h-[400px]">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full max-h-[500px] outline-none"
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onVideoEnd}
        // Is se video smooth chalti hai
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;