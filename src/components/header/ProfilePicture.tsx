import React from "react";
import { Link } from "wouter";

import "./ProfilePicture.css";

export const ProfilePicture: React.FC = () => (
  <Link id="profilePicture" href="/">
    <img
      src="https://i1.sndcdn.com/avatars-jquDmsmOHxTK139m-qKsjtg-t500x500.jpg"
      alt="Profile Picture"
    />
  </Link>
);
