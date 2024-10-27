import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Error } from "./routes/error";
import { Root } from "./routes/root";
import { Stream } from "./routes/stream";

import "./App.css";
import { Home } from "./routes/home";
import { AudioPlayerContextProvider } from "./contexts/audio-player";
import { PlayerApiContextProvider } from "./contexts/plays-api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "stream/:streamId",
        element: <Stream />,
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
