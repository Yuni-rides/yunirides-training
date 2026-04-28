"use client";

import React, { useRef, useState, useEffect } from 'react';

interface Props {
  videoUrl: string;
  lastSavedTime: number;
  onProgressUpdate: (seconds: number) => void;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl, lastSavedTime, onProgressUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [maxTimeWatched, setMaxTimeWatched] = useState(lastSavedTime);

  // Jab video load ho jaye toh purani position par le jao
  useEffect(() => {
    if (videoRef.current && lastSavedTime > 0) {
      videoRef.current.currentTime = lastSavedTime;
    }
  }, [lastSavedTime]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;

    // 1. ANTI-SKIP LOGIC: Agar user 3 sec se zyada aage jump kare
    if (currentTime > maxTimeWatched + 3) {
      videoRef.current.currentTime = maxTimeWatched;
    } else {
      if (currentTime > maxTimeWatched) {
        setMaxTimeWatched(currentTime);
        
        // 2. Har 5 seconds baad progress save karein
        if (Math.floor(currentTime) % 5 === 0 && Math.floor(currentTime) !== 0) {
          onProgressUpdate(Math.floor(currentTime));
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
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;