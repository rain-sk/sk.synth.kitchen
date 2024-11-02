import React from "react";

import { AudioStream } from "./Stream";
import { streams } from "../../data/streams";
import "./Streams.css";
import { Link } from "react-router-dom";

export const Streams: React.FC<{ abbreviated?: boolean }> = ({
  abbreviated,
}) => {
  const renderedStreams = abbreviated ? streams.slice(0, 2) : streams;
  return (
    <section>
      <header>
        <h2>dj sets</h2>
        {abbreviated && (
          <Link to="streams">
            see all<span className="visually-hidden"> dj sets</span>
          </Link>
        )}
      </header>
      {renderedStreams.map((stream) => (
        <AudioStream key={stream.streamId} {...stream} abbreviated />
      ))}
    </section>
  );
};
