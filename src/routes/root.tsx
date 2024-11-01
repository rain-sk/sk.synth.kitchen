import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { ParallaxBackground } from "../components/parallax-background/ParallaxBackground";
import { NowPlaying } from "../components/now-playing/NowPlaying";

export const RootRoute: React.FC = () => {
  return (
    <>
      <ParallaxBackground />
      <Header />
      <Outlet />
      <NowPlaying />
    </>
  );
};
