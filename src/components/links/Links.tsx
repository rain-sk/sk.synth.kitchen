import React from "react";
import {
  faHeadphonesSimple,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <i className="fab fa-bandcamp">&nbsp;</i>
        <p>Follow Sk [Rain] on Bandcamp</p>
      </a>
      <a
        className="link"
        href="https://soundcloud.com/sk-rain/sets/eclat-crew"
        target="_blank"
      >
        <i className="fab fa-soundcloud">&nbsp;</i>
        <span className="visually-hidden">SoundCloud</span>
        <p>Sk [Rain]'s tracks from Éclat Crew</p>
      </a>
      <a
        className="link"
        href="https://soundcloud.com/sk-rain/sets/eclat-crew"
        target="_blank"
      >
        <FontAwesomeIcon icon={faHeadphonesSimple} />
        <p>The Éclat Crew Website</p>
      </a>
      <a
        className="link"
        href="https://instagram.com/rush_berlin"
        target="_blank"
      >
        <i className="fab fa-instagram">&nbsp;</i>
        <p>Rush on Instagram</p>
      </a>
    </section>
    <section>
      <h2>find me on</h2>

      <ul className="socials">
        <li>
          <a href="https://www.instagram.com/sk_rain_/" target="_blank">
            <i className="fab fa-instagram">&nbsp;</i>
            <span className="visually-hidden">Instagram</span>
          </a>
        </li>
        <li>
          <a href="https://sk-rain.bandcamp.com/music" target="_blank">
            <i className="fab fa-bandcamp">&nbsp;</i>
            <span className="visually-hidden">Bandcamp</span>
          </a>
        </li>
        <li>
          <a href="https://soundcloud.com/sk-rain" target="_blank">
            <i className="fab fa-soundcloud">&nbsp;</i>
            <span className="visually-hidden">SoundCloud</span>
          </a>
        </li>
        <li>
          <a
            href="https://open.spotify.com/artist/4ayqL65GUwhAUvD6vGm0FJ"
            target="_blank"
          >
            <i className="fab fa-spotify">&nbsp;</i>
            <span className="visually-hidden">Spotify</span>
          </a>
        </li>
      </ul>
    </section>
  </>
);
