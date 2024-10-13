import React from "react";
import { Link } from "react-router-dom";
import { AudioPlayer } from "../audio-player/AudioPlayer";

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
    <section>
      <h2>
        <Link to={`/stream/${streamId}`}>{title}</Link>
      </h2>
      <AudioPlayer streamId={streamId} />
      {expanded && tracklist ? (
        <ul>
          {tracklist.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};
