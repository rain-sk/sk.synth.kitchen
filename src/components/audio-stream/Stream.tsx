import React from "react";
import { Link } from "react-router-dom";
import { AudioPlayer } from "../audio-player/AudioPlayer";
import "./Stream.css";
import { streamsMap } from "../../data/streams";

// import { PlayerApiContext } from "../../contexts/plays-api";
// import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <header>
        <h3>
          <Link to={`/stream/${streamId}`}>{title}</Link>
        </h3>
        <aside>{streamsMap[streamId].info}</aside>
        {/* {players && players[streamId] ? (
          <p>
            <FontAwesomeIcon icon={faPlay} /> {players[streamId].plays}
          </p>
        ) : null} */}
      </header>
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
