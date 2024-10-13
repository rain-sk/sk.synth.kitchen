import React from "react";

import { AudioStream } from "../components/audio-stream/AudioStream";
import { streams } from "../streams";

const AllStreams: React.FC = () =>
  streams.map((stream) => (
    <AudioStream key={stream.streamId} expanded={false} {...stream} />
  ));

export const Home: React.FC = () => {
  return <AllStreams />;
};
