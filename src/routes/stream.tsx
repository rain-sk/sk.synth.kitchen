import React from "react";

import { AudioStream } from "../components/audio-stream/Stream";
import { getStream } from "../data/streams";
import { ErrorRoute } from "./error";
import { useParams } from "react-router-dom";

type RouteParams = {
  streamId?: string;
};

export const StreamRoute: React.FC = () => {
  const { streamId } = useParams<RouteParams>();

  if (!streamId) {
    return <ErrorRoute />;
  }

  const stream = getStream(streamId);

  if (!stream) {
    return <ErrorRoute />;
  }

  return (
    <main>
      <section>
        <article>
          <AudioStream
            expanded={true}
            streamId={stream.streamId}
            title={stream.title}
            tracklist={stream.tracklist}
          />
        </article>
      </section>
    </main>
  );
};
