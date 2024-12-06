import React, { useCallback, useContext } from "react";
import { EventApiContext } from "../contexts/events-api";

type LinkProps = {
  href: string;
  target: string;
};

export const EventLink: React.FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  target,
  children,
}) => {
  const { recordEvent } = useContext(EventApiContext);

  const onClick = useCallback(() => {
    recordEvent("link", { href });
  }, [href, target]);

  return (
    <a onClick={onClick} href={href} target={target}>
      {children}
    </a>
  );
};
