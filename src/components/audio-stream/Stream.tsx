import React from "react";
import { Link } from "react-router-dom";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import "./Stream.css";
import { StreamInfo } from "../../data/streams";

type StreamProps = StreamInfo & {
  abbreviated?: boolean;
};

export const AudioStream: React.FC<StreamProps> = ({
  streamId,
  title,
  info,
  tracklist,
  abbreviated,
}) => {
  return (
    <article>
      <header>
        <h3>
          <Link to={`/stream/${streamId}`}>{title}</Link>
        </h3>
        <aside>{info}</aside>
      </header>
      <AudioPlayer streamId={streamId} />
      {!abbreviated && tracklist ? (
        <ul className="tracklist">
          {tracklist.map(([track, artist], index) => (
            <li key={index}>
              <span>{track}</span>
              <span></span>
              <span>{artist}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};
