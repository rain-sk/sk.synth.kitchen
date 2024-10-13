import React from "react";
import "./ProfilePicture.css";
import { Link } from "react-router-dom";

export const ProfilePicture: React.FC = () => (
  <Link id="profilePicture" to="/">
    <img
      id="profilePicture"
      src="https://i1.sndcdn.com/avatars-DofzOl0NFFLxPSts-uf2Naw-t500x500.jpg"
      alt="Profile Picture"
    />
  </Link>
);
