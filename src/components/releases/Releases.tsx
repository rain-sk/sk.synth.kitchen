import React from "react";
import "./Releases.css";

export const Releases: React.FC = () => (
  <section>
    <h2>releases</h2>
    <div className="releases">
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/album=820312149/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
      >
        <a href="https://sksksk.bandcamp.com/album/zela">Zela by Sk</a>
      </iframe>
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/album=906746429/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
      >
        <a href="https://sksksk.bandcamp.com/album/fields">Fields by Sk</a>
      </iframe>
    </div>
  </section>
);
