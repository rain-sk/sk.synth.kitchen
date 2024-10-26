import React from "react";
import { Link } from "react-router-dom";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import "./AudioStream.css";

type StreamProps = {
  expanded: boolean;
  streamId: string;
  title: string;
  tracklist?: string[];
};

export const AudioStream: React.FC<StreamProps> = ({
  expanded,
  streamId,
  title,
  tracklist,
}) => {
  return (
    <>
      <h3>
        <Link to={`/stream/${streamId}`}>{title}</Link>
      </h3>
      <AudioPlayer streamId={streamId} />
      {expanded && tracklist ? (
        <ul className="tracklist">
          {tracklist.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
