import React from "react";

import { Releases } from "../components/releases/Releases";
import { Bio } from "../components/bio/Bio";
import { Links } from "../components/links/Links";
import { Streams } from "../components/audio-stream/Streams";

export const HomeRoute: React.FC = () => {
  return (
    <main>
      <Releases abbreviated />
      <Streams abbreviated />
      <Bio />
      <Links />
    </main>
  );
};
