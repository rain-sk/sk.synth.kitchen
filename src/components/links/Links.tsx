import React from "react";

import { SocialLinks } from "../social-links/SocialLinks";

import { Plug } from "../../icons/plug";
import { Bandcamp } from "../../icons/bandcamp";
import { SoundCloud } from "../../icons/soundcloud";
import { Headphones } from "../../icons/headphones";
import { Instagram } from "../../icons/instagram";
import { Spotify } from "../../icons/spotify";

import "./Links.css";

const skSocialLinks = [
  {
    url: "https://www.instagram.com/sk_rain_/",
    icon: <Instagram />,
    text: "Instagram",
  },
  {
    url: "https://sk-rain.bandcamp.com/music",
    icon: <Bandcamp />,
    text: "Bandcamp",
  },
  {
    url: "https://soundcloud.com/sk-rain",
    icon: <SoundCloud />,
    text: "SoundCloud",
  },
  {
    url: "https://open.spotify.com/artist/4ayqL65GUwhAUvD6vGm0FJ",
    icon: <Spotify />,
    text: "Spotify",
  },
];

export const Links: React.FC = () => (
  <>
    <section>
      <h2>linktree</h2>

      <a className="link" href="https://synth.kitchen" target="_blank">
        <Plug />
        <p>Synth Kitchen - a web-based modular synthesizer</p>
      </a>
      <a
        className="link"
        href="https://sk-rain.bandcamp.com/follow_me"
        target="_blank"
      >
        <Bandcamp />
        <p>Follow Sk [Rain] on Bandcamp</p>
      </a>
      <a
        className="link"
        href="https://soundcloud.com/sk-rain/sets/eclat-crew"
        target="_blank"
      >
        <SoundCloud />
        <span className="visually-hidden">SoundCloud</span>
        <p>Sk [Rain]'s tracks from Éclat Crew</p>
      </a>
      <a className="link" href="https://eclatcrew.com" target="_blank">
        <Headphones />
        <p>The Éclat Crew Website</p>
      </a>
      <a
        className="link"
        href="https://instagram.com/rush_berlin"
        target="_blank"
      >
        <Instagram />
        <p>Rush on Instagram</p>
      </a>
    </section>
    <section>
      <h2>find me on</h2>
      <SocialLinks links={skSocialLinks} />
    </section>
  </>
);
