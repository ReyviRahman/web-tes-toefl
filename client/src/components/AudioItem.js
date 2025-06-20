import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";

const AudioItem = ({ index, audioSrc,   nohp }) => {
  const localStorageKey = `audio-played-${nohp}`;
  const [playedList, setPlayedList] = useState([]);
  const indexKey = index.toString();

  useEffect(() => {
    const playedRaw = localStorage.getItem(localStorageKey);
    const list = playedRaw ? JSON.parse(playedRaw) : [];
    setPlayedList(list);
  }, [index]);

  const hasPlayed = playedList.includes(indexKey);

  const handlePlay = (e) => {
    if (hasPlayed) {
      // Cegah main ulang
      e.preventDefault();
      e.target.pause();
      e.target.currentTime = 0;
    } else {
      // Simpan ke localStorage dan langsung sembunyikan
      const updatedList = [...playedList, indexKey];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
      setPlayedList(updatedList);
    }
  };

  return (
    <div className="relative">
      <AudioPlayer
        autoPlayAfterSrcChange={false}
        src={audioSrc}
        onPlay={handlePlay}
        onEnded={() => {}}
        showJumpControls={false}
        customAdditionalControls={[]}
      />
      {hasPlayed && (
        <div
          className="absolute inset-0 z-10"
          style={{ cursor: 'not-allowed' }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
};

export default AudioItem;
