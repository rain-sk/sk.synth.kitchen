import React from "react";
import "./Releases.css";

export const Releases: React.FC = () => (
  <section>
    <h2>releases</h2>
    <div className="releases">
      <article>
        <header>
          <h3>Do It Again - Remix</h3>
          <aside>2024</aside>
        </header>
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=4189743445/size=small/bgcol=ffffff/linkcol=0687f5/track=997702670/transparent=true/"
          seamless
        >
          <a href="https://liadland.bandcamp.com/album/nothing-to-declare-special-limited-edition-extended-album">
            Nothing To Declare - Special Limited Edition Extended Album by
            Liadland
          </a>
        </iframe>
        <p>
          You burned your hand in the fire? Do it again.
          <br />
          <br />
          This dancefloor remix of Liadland's{" "}
          <a href="https://liadland.bandcamp.com/track/do-it-again-3">
            <i>Do It Again</i>
          </a>{" "}
          offers a groovy take on the original. Liadland's powerful vocals glide
          along as the rhythm pushes you further and further over the edge.
        </p>
      </article>
      <article>
        <header>
          <h3>Zela</h3>
          <aside>2019</aside>
        </header>
        <iframe
          src="https://bandcamp.com/EmbeddedPlayer/album=820312149/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          seamless
        >
          <a href="https://sk-rain.bandcamp.com/album/zela">
            Zela by Sk [Rain]
          </a>
        </iframe>
        <p>
          A sonic journey that combines elements of techno, house, and
          experimental electronics. Each track blends into the next, creating a
          narrative arc that draws listeners in from start to finish. Zela
          represents a natural progression for Sk [Rain] as an artist,
          showcasing the evolution of their creative vision.
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
          <a href="https://sk-rain.bandcamp.com/album/fields">
            Fields by Sk [Rain]
          </a>
        </iframe>
        <p>
          Sk [Rain]'s debut EP, featuring a diverse range of genres and styles
          that have captured their imagination. From minimal/ambient house to
          "sound fields", Fields is a journey into the sonic landscapes that
          inspire Sk [Rain]. Listeners are invited to explore the interplay
          between music and environment.
        </p>
      </article>
    </div>
  </section>
);
