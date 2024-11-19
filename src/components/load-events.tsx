import { useContext, useEffect } from "react";
import { EventApiContext } from "../contexts/events-api";
import { useLocation } from "wouter";

export const LoadEvents = () => {
  const { recordEvent } = useContext(EventApiContext);
  const [location] = useLocation();

  useEffect(() => {
    recordEvent("load", {
      ua: window.navigator.userAgent,
    });
  }, [location]);

  return null;
};
