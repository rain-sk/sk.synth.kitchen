import React from "react";
import "./SocialLinks.css";

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
        <a href={link.url} target="_blank">
          {link.icon}
          <span className="visually-hidden">{link.text}</span>
        </a>
      </li>
    ))}
  </ul>
);
