import React from "react";
import { Link } from "wouter";

import { ProfilePicture } from "./ProfilePicture";

import "./Header.css";
import { EventLink } from "../EventLink";

export const Header: React.FC = () => (
  <nav>
    <ProfilePicture />

    <div>
      <h1>
        <Link href="/">
          <span>Sk</span>
          <span>[Rain]</span>
        </Link>
      </h1>
      <p>Producer | DJ | Music&nbsp;Technologist</p>
      <p>
        <EventLink href="mailto:contact@synth.kitchen">
          Reach&nbsp;Out
        </EventLink>{" "}
        |{" "}
        <EventLink href="mailto:booking@synth.kitchen">
          Booking&nbsp;Inquiries
        </EventLink>
      </p>
    </div>
  </nav>
);
