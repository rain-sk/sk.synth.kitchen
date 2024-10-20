import React from "react";

import { Releases } from "../components/releases/Releases";
import { AllStreams } from "../components/audio-stream/AllStreams";

export const Home: React.FC = () => {
  return (
    <>
      <Releases />
      <AllStreams />
    </>
  );
};
