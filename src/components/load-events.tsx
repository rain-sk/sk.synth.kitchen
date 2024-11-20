import { useContext, useEffect } from "react";
import { EventApiContext } from "../contexts/events-api";
import { useLocation } from "wouter";

export const LoadEvents = () => {
  const { recordEvent } = useContext(EventApiContext);
  const [location] = useLocation();

  useEffect(() => {
    fetch("https://api.db-ip.com/v2/free/self")
      .then((res) => res.json())
      .then((location) => {
        recordEvent("load", {
          location: {
            city: location.city,
            country: location.countryName,
          },
          ua: window.navigator.userAgent,
        });
      });
  }, [location]);

  return null;
};
