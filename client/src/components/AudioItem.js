import { useEffect, useRef, useState } from "react";

const AudioItem = ({ index, audioSrc, nohp }) => {
  const localStorageKey = `audio-played-${nohp}`;
  const indexKey = index.toString();
  const [playedList, setPlayedList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playedRaw = localStorage.getItem(localStorageKey);
    const list = playedRaw ? JSON.parse(playedRaw) : [];
    setPlayedList(list);
  }, [index]);

  const hasPlayed = playedList.includes(indexKey);

  const handleCanPlayThrough = () => {
    setIsLoaded(true);
  };

  const handlePlay = (e) => {
    if (hasPlayed) {
      e.preventDefault();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    } else {
      const updatedList = [...playedList, indexKey];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
      setPlayedList(updatedList);
    }
  };

  return (
    <div className="relative">
      {/* Audio always rendered */}
      <audio
        controls
        controlsList="nodownload noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
        preload="auto"
        src={audioSrc}
        onCanPlayThrough={handleCanPlayThrough}
        onPlay={handlePlay}
        ref={audioRef}
        className={`w-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Loading Spinner Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-20">
          <svg
            className="animate-spin h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="ml-2 text-gray-500">Loading audio...</span>
        </div>
      )}

      {/* Blokir Klik jika sudah diputar */}
      {hasPlayed && (
        <div
          className="absolute inset-0 z-10 cursor-not-allowed"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
};

export default AudioItem;
