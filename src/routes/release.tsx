import React from "react";

import { Release } from "../components/releases/Release";

import { ErrorRoute } from "./error";
import { useParams } from "react-router-dom";
import { getRelease } from "../data/releases";
import { Link } from "react-router-dom";
import { SocialLinks } from "../components/social-links/SocialLinks";

type RouteParams = {
  releaseId?: string;
};

export const ReleaseRoute: React.FC = () => {
  const { releaseId } = useParams<RouteParams>();

  if (!releaseId) {
    return <ErrorRoute />;
  }

  const release = getRelease(releaseId);

  if (!release) {
    return <ErrorRoute />;
  }

  return (
    <main>
      <section>
        <header>
          <h2>release</h2>
          <Link to="/releases">see all</Link>
        </header>
        <Release key={release.title} release={release} full />
      </section>

      {release.streams && (
        <section>
          <h2>stream on</h2>
          <SocialLinks links={release.streams} />
        </section>
      )}
    </main>
  );
};
