import React from "react";
import "./Releases.css";

export const Releases: React.FC = () => (
  <section className="releases">
    <h2>releases</h2>
    <div>
      <iframe
        style={{ border: 0, width: "300px", height: "250px" }}
        src="https://bandcamp.com/EmbeddedPlayer/album=820312149/size=large/bgcol=000000/linkcol=dadada/artwork=small/transparent=true/"
        seamless
      >
        <a href="https://sksksk.bandcamp.com/album/zela">Zela by Sk</a>
      </iframe>
      <iframe
        style={{ border: 0, width: "300px", height: "250px" }}
        src="https://bandcamp.com/EmbeddedPlayer/album=906746429/size=large/bgcol=000000/linkcol=dadada/artwork=small/transparent=true/"
        seamless
      >
        <a href="https://sksksk.bandcamp.com/album/fields">Fields by Sk</a>
      </iframe>
    </div>
  </section>
);
