import React from "react";
import { Link } from "wouter";

import { releases } from "../../data/releases";
import { Release } from "./Release";

import "./Releases.css";

export const Releases: React.FC<{ abbreviated?: boolean }> = ({
  abbreviated,
}) => {
  const renderedReleases = abbreviated ? releases.slice(0, 2) : releases;
  return (
    <section>
      <header>
        <h2>releases</h2>
        {abbreviated && (
          <Link href="/releases">
            see all<span className="visually-hidden"> releases</span>
          </Link>
        )}
      </header>
      <div className="releases">
        {renderedReleases.map((release) => (
          <Release key={release.title} release={release} full={false} />
        ))}
      </div>
    </section>
  );
};
