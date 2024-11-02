import React from "react";
import { Link } from "wouter";

import { AudioPlayer } from "../audio-player/AudioPlayer";
import { StreamInfo } from "../../data/streams";

import "./Stream.css";

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
          <Link href={`/stream/${streamId}`}>{title}</Link>
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
