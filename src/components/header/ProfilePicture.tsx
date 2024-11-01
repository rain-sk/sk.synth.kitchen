import React from "react";
import "./ProfilePicture.css";
import { Link } from "react-router-dom";

export const ProfilePicture: React.FC = () => (
  <Link id="profilePicture" to="/">
    <img
      src="https://i1.sndcdn.com/avatars-jquDmsmOHxTK139m-qKsjtg-t500x500.jpg"
      alt="Profile Picture"
    />
  </Link>
);
