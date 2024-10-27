import React, { useContext } from "react";
import "./NowPlaying.css";
import { AudioPlayerContext } from "../../contexts/audio-player";
import { Link } from "react-router-dom";
import { streamsMap } from "../../streams";

export const NowPlaying: React.FC = () => {
  const { activeStreamId } = useContext(AudioPlayerContext);
  return activeStreamId ? (
    <aside className="now-playing">
      <p>
        now playing:{" "}
        <Link to={`/stream/${activeStreamId}`}>
          {streamsMap[activeStreamId].title}
        </Link>
      </p>
    </aside>
  ) : null;
};
