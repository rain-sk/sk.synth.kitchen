import React from "react";
import { Link, Redirect } from "wouter";

import { AudioStream } from "../components/audio-stream/Stream";
import { getStream } from "../data/streams";

type StreamRouteProps = {
  streamId: string;
};

export const StreamRoute: React.FC<StreamRouteProps> = ({ streamId }) => {
  const stream = getStream(streamId);

  if (!stream) {
    return <Redirect to="/404" />;
  }

  return (
    <main>
      <section>
        <header>
          <h2>dj set</h2>
          <Link href="/streams">
            see all<span className="visually-hidden"> dj sets</span>
          </Link>
        </header>
        <AudioStream key={stream.streamId} {...stream} />
      </section>
    </main>
  );
};
