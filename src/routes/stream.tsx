import React from "react";

import { AudioStream } from "../components/audio-stream/Stream";
import { getStream } from "../data/streams";
import { ErrorRoute } from "./error";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <header>
          <h2>dj set</h2>
          <Link to="/streams">
            see all<span className="visually-hidden"> dj sets</span>
          </Link>
        </header>
        <AudioStream key={stream.streamId} {...stream} />
      </section>
    </main>
  );
};
