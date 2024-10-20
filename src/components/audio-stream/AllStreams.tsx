import React from "react";

import { AudioStream } from "../../components/audio-stream/AudioStream";
import { streams } from "../../streams";

export const AllStreams: React.FC = () => (
  <section>
    <h2>recent sets</h2>
    {streams.map((stream) => (
      <AudioStream key={stream.streamId} expanded={false} {...stream} />
    ))}
  </section>
);
