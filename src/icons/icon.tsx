import React from "react";

export const Icon: React.FC<{ svg: string }> = ({ svg }) => (
  <i
    className="icon"
    dangerouslySetInnerHTML={{
      __html: svg,
    }}
  ></i>
);
