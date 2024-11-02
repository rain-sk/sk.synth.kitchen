import React from "react";
import { Link } from "wouter";

import { ProfilePicture } from "./ProfilePicture";

import "./Header.css";

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
        <a href="mailto:contact@synth.kitchen">Reach&nbsp;Out</a> |{" "}
        <a href="mailto:booking@synth.kitchen">Booking&nbsp;Inquiries</a>
      </p>
    </div>
  </nav>
);
