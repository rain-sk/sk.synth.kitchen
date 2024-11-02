import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandcamp } from "@fortawesome/free-brands-svg-icons/faBandcamp";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons/faHeadphonesSimple";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons/faSoundcloud";
import { faSpotify } from "@fortawesome/free-brands-svg-icons/faSpotify";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons/faWaveSquare";

import { SocialLinks } from "../social-links/SocialLinks";
import "./Links.css";

export const Links: React.FC = () => (
  <>
    <section>
      <h2>linktree</h2>

      <a className="link" href="https://synth.kitchen" target="_blank">
        <FontAwesomeIcon icon={faWaveSquare} />
        <p>Synth Kitchen - a web-based modular synthesizer</p>
      </a>
      <a
        className="link"
        href="https://sk-rain.bandcamp.com/follow_me"
        target="_blank"
      >
        <FontAwesomeIcon icon={faBandcamp} />
        <p>Follow Sk [Rain] on Bandcamp</p>
      </a>
      <a
        className="link"
        href="https://soundcloud.com/sk-rain/sets/eclat-crew"
        target="_blank"
      >
        <FontAwesomeIcon icon={faSoundcloud} />
        <span className="visually-hidden">SoundCloud</span>
        <p>Sk [Rain]'s tracks from Éclat Crew</p>
      </a>
      <a className="link" href="https://eclatcrew.com" target="_blank">
        <FontAwesomeIcon icon={faHeadphonesSimple} />
        <p>The Éclat Crew Website</p>
      </a>
      <a
        className="link"
        href="https://instagram.com/rush_berlin"
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} />
        <p>Rush on Instagram</p>
      </a>
    </section>
    <section>
      <h2>find me on</h2>
      <SocialLinks
        links={[
          {
            url: "https://www.instagram.com/sk_rain_/",
            icon: <FontAwesomeIcon icon={faInstagram} />,
            text: "Instagram",
          },
          {
            url: "https://sk-rain.bandcamp.com/music",
            icon: <FontAwesomeIcon icon={faBandcamp} />,
            text: "Bandcamp",
          },
          {
            url: "https://soundcloud.com/sk-rain",
            icon: <FontAwesomeIcon icon={faSoundcloud} />,
            text: "SoundCloud",
          },
          {
            url: "https://open.spotify.com/artist/4ayqL65GUwhAUvD6vGm0FJ",
            icon: <FontAwesomeIcon icon={faSpotify} />,
            text: "Spotify",
          },
        ]}
      />
    </section>
  </>
);
