import React from "react";
import { Link } from "wouter";

import { ReleaseData } from "../../data/releases";

import "./Release.css";

export const Release: React.FC<{ release: ReleaseData; full?: boolean }> = ({
  release: { id, title, aside, iframe, text, image },
  full,
}) => {
  console.log(full);
  return (
    <article className={`release${full ? " full" : ""}`}>
      <header>
        <h3>
          <Link href={`/release/${id}`}>{title}</Link>
        </h3>
        <aside>{aside}</aside>
      </header>
      <section>
        {full ? (
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{
              __html: iframe,
            }}
          ></div>
        ) : (
          <Link href={`/release/${id}`}>
            <img src={image} alt={title} />
          </Link>
        )}
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </section>
    </article>
  );
};
