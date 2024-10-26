import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { ParallaxBackground } from "../components/parallax-background/ParallaxBackground";

export const Root: React.FC = () => (
  <>
    <ParallaxBackground />
    <Header />
    <Outlet />
  </>
);
