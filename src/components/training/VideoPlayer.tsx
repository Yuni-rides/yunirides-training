"use client";
import React, { useRef, useState, useEffect } from "react";

interface Props {
  videoUrl: string;
  lastSavedTime: number;
  onProgressUpdate: (seconds: number) => void;
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<Props> = ({
  videoUrl,
  lastSavedTime,
  onProgressUpdate,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

    if (currentTime > maxTimeRef.current + 2) {
      video.currentTime = maxTimeRef.current;
    } else {
      if (currentTime > maxTimeRef.current) {
        maxTimeRef.current = currentTime;
        if (Math.floor(currentTime) % 2 === 0) {
          onProgressUpdate(currentTime);
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-contain outline-none"
        controls
        controlsList="nodownload"
        playsInline
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onVideoEnd}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
