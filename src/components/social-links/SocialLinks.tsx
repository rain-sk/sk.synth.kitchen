import React from "react";
import "./SocialLinks.css";
import { EventLink } from "../EventLink";

export type SocialLinkInfo = {
  text: string;
  icon: React.ReactNode;
  url: string;
};

export const SocialLinks: React.FC<{ links: SocialLinkInfo[] }> = ({
  links,
}) => (
  <ul className="socials">
    {links.map((link, i) => (
      <li key={i}>
        <EventLink href={link.url} target="_blank">
          {link.icon}
          <span className="visually-hidden">{link.text}</span>
        </EventLink>
      </li>
    ))}
  </ul>
);
