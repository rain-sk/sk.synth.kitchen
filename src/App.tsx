import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorRoute } from "./routes/error";
import { RootRoute } from "./routes/root";
import { StreamRoute } from "./routes/stream";

import "./App.css";
import { HomeRoute } from "./routes/home";
import { AudioPlayerContextProvider } from "./contexts/audio-player";
import { PlayerApiContextProvider } from "./contexts/plays-api";
import { ReleasesRoute } from "./routes/releases";
import { ReleaseRoute } from "./routes/release";
import { StreamsRoute } from "./routes/streams";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
      },
      {
        path: "streams",
        element: <StreamsRoute />,
      },
      {
        path: "stream/:streamId",
        element: <StreamRoute />,
      },
      {
        path: "releases/",
        element: <ReleasesRoute />,
      },
      {
        path: "release/:releaseId",
        element: <ReleaseRoute />,
      },
    ],
  },
]);

export const App: React.FC = () => (
  <PlayerApiContextProvider>
    <AudioPlayerContextProvider>
      <RouterProvider router={router} />
    </AudioPlayerContextProvider>
  </PlayerApiContextProvider>
);
