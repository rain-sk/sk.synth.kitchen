import React from "react";

import { Release } from "../components/releases/Release";

import { getRelease } from "../data/releases";
import { SocialLinks } from "../components/social-links/SocialLinks";
import { Link, Redirect } from "wouter";

type ReleaseRouteProps = {
  releaseId: string;
};

export const ReleaseRoute: React.FC<ReleaseRouteProps> = ({ releaseId }) => {
  const release = getRelease(releaseId);

  if (!release) {
    return <Redirect to="/404" />;
  }

  return (
    <main>
      <section>
        <header>
          <h2>release</h2>
          <Link href="/releases">see all</Link>
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
