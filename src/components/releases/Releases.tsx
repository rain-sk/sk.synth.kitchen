import React from "react";
import "./Releases.css";

export const Releases: React.FC = () => (
  <section>
    <h2>releases</h2>
    <div className="releases">
      <article>
        <header>
          <h3>Zela</h3>
          <aside>2019</aside>
        </header>
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=820312149/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          seamless
        >
          <a href="https://sksksk.bandcamp.com/album/zela">Zela by Sk</a>
        </iframe>
        <p></p>
      </article>
      <article>
        <header>
          <h3>Fields</h3>
          <aside>2018</aside>
        </header>
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=906746429/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          seamless
        >
          <a href="https://sksksk.bandcamp.com/album/fields">Fields by Sk</a>
        </iframe>
        <p></p>
      </article>
    </div>
  </section>
);
