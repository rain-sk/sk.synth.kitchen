import React from "react";

import { AudioStream } from "./Stream";
import { streams } from "../../data/streams";
import "./Streams.css";
import { Link } from "react-router-dom";

export const Streams: React.FC<{ abbreviated?: boolean }> = ({
  abbreviated,
}) => (
  <section>
    <h2>dj sets</h2>
    {abbreviated && <Link to="streams">see all</Link>}
    {streams.map((stream) => (
      <article key={stream.streamId}>
        <AudioStream expanded={false} {...stream} />
      </article>
    ))}
  </section>
);
