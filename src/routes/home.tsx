import React from "react";

import { Releases } from "../components/releases/Releases";
import { Bio } from "../components/bio/Bio";
import { Links } from "../components/links/Links";
import { AllStreams } from "../components/audio-stream/AllStreams";

export const Home: React.FC = () => {
  return (
    <main>
      <Releases />
      <AllStreams />
      <Bio />
      <Links />
    </main>
  );
};
