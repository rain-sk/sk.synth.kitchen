import React from "react";
import { Route, Switch } from "wouter";

import { ErrorRoute } from "./routes/error";
import { HomeRoute } from "./routes/home";
import { ReleaseRoute } from "./routes/release";
import { ReleasesRoute } from "./routes/releases";
import { StreamRoute } from "./routes/stream";
import { StreamsRoute } from "./routes/streams";

import { AudioPlayerContextProvider } from "./contexts/audio-player";

import { Header } from "./components/header/Header";
import { NowPlaying } from "./components/now-playing/NowPlaying";
import { ParallaxBackground } from "./components/parallax-background/ParallaxBackground";

import "./App.css";
import { ScrollToTop } from "./components/scroll-to-top";
import { EventApiContextProvider } from "./contexts/events-api";
import { LoadEvents } from "./components/load-events";

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <EventApiContextProvider>
        <AudioPlayerContextProvider>
          <LoadEvents />
          <ParallaxBackground />
          <Header />
          <Switch>
            <Route path="/" component={HomeRoute} />
            <Route path="/404" component={ErrorRoute} />
            <Route path="/streams" component={StreamsRoute} />
            <Route path="/stream/:streamId">
              {(params) => <StreamRoute streamId={params.streamId} />}
            </Route>
            <Route path="/releases" component={ReleasesRoute} />
            <Route path="/release/:releaseId">
              {(params) => <ReleaseRoute releaseId={params.releaseId} />}
            </Route>

            <Route>
              <ErrorRoute />
            </Route>
          </Switch>
          <NowPlaying />
        </AudioPlayerContextProvider>
      </EventApiContextProvider>
    </>
  );
};
