import React from "react";
import { EventLink } from "../EventLink";

export const Bio: React.FC = () => (
  <section>
    <h2>about</h2>
    <p>
      Sk [Rain] is a producer, DJ, and music technologist based in Berlin. Their
      music spans the range of experimental/IDM to club-oriented house and
      techno.
    </p>
    <p>
      When they aren't doing music or working as a product leader at Ableton, Sk
      [Rain] is active with{" "}
      <EventLink href="https://eclatcrew.com" target="_blank">
        Éclat Crew
      </EventLink>{" "}
      and the{" "}
      <EventLink href="https://resonancemusicretreat.xyz" target="_blank">
        Resonance Music Community
      </EventLink>
      , and co-organizes the{" "}
      <EventLink href="https://rush.berlin" target="_blank">
        Rush DJ Livestream
      </EventLink>
      . They also build and use{" "}
      <EventLink href="https://synth.kitchen" target="_blank">
        synth.kitchen
      </EventLink>
      , a web-based modular synthesis environment geared toward experimental
      sound design.
    </p>
    <p>
      Currently Sk [Rain] is focusing on some soon-to-be-released collaborations
      and a few other fun things.
    </p>
  </section>
);
