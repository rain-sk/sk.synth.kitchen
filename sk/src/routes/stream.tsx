import React from "react";

import { AudioStream } from "../components/audio-stream/AudioStream";
import { getStream } from "../streams";
import { Error } from "./error";
import { useParams } from "react-router-dom";

type RouteParams = {
  streamId?: string;
};

export const Stream: React.FC = () => {
  const { streamId } = useParams<RouteParams>();

  if (!streamId) {
    return <Error />;
  }

  const stream = getStream(streamId);

  if (!stream) {
    return <Error />;
  }

  return (
    <AudioStream
      expanded={true}
      streamId={stream.streamId}
      title={stream.title}
      tracklist={stream.tracklist}
    />
  );
};
