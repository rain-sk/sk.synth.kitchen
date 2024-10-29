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
        <p>
          A sonic journey that combines elements of techno, house, and
          experimental electronics. Each track blends into the next, creating a
          narrative arc that draws listeners in from start to finish. Zela
          represents a natural progression for Sk as an artist, showcasing the
          evolution of their creative vision.
        </p>
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
        <p>
          Sk's debut EP, featuring a diverse range of genres and styles that
          have captured their imagination. From minimal/ambient house to "sound
          fields", Fields is a journey into the sonic landscapes that inspire
          Sk. Listeners are invited to explore the interplay between music and
          environment.
        </p>
      </article>
    </div>
  </section>
);
