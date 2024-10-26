import React from "react";

import { AudioStream } from "../../components/audio-stream/AudioStream";
import { streams } from "../../streams";
import "./AllStreams.css";

export const AllStreams: React.FC = () => (
  <section>
    <h2>recent sets</h2>
    {streams.map((stream) => (
      <article key={stream.streamId}>
        <AudioStream expanded={false} {...stream} />
      </article>
    ))}
  </section>
);
