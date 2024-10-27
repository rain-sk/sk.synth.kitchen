import React from "react";
import "./Header.css";
import { ProfilePicture } from "./ProfilePicture";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
  <nav>
    <ProfilePicture />

    <div>
      <h1>
        <Link to="/">Sk</Link>
      </h1>
      <p>Producer | DJ | Music&nbsp;Technologist</p>
      <p>
        <a href="mailto:contact@synth.kitchen">Reach&nbsp;Out</a> |{" "}
        <a href="mailto:booking@synth.kitchen">Booking&nbsp;Inquiries</a>
      </p>
    </div>
  </nav>
);
