import React, { useContext } from "react";
import { Link } from "wouter";

import { AudioPlayerContext } from "../../contexts/audio-player";
import { streamsMap } from "../../data/streams";

import "./NowPlaying.css";

export const NowPlaying: React.FC = () => {
  const { activeStreamId } = useContext(AudioPlayerContext);
  return activeStreamId ? (
    <aside className="now-playing">
      <p>
        now playing:{" "}
        <Link href={`/stream/${activeStreamId}`}>
          {streamsMap[activeStreamId].title}
        </Link>
      </p>
    </aside>
  ) : null;
};
