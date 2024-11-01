import React from "react";

import { Releases as AllReleases } from "../components/releases/Releases";

export const ReleasesRoute: React.FC = () => {
  return (
    <main>
      <AllReleases />
    </main>
  );
};
