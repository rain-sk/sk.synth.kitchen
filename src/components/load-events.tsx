import { useContext, useEffect, useRef } from "react";
import { useLocation } from "wouter";

import { EventApiContext } from "../contexts/events-api";
import { useEffectOnce } from "../hooks/use-effect-once";

export const LoadEvents = () => {
  const { recordEvent } = useContext(EventApiContext);

  useEffectOnce(() => {
    fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=85ac02341b9e4b7494409ac1b4950629"
    )
      .then((res) => res.json())
      .then((location) => {
        if (location && "city" in location && "country_name" in location) {
          recordEvent("location", {
            city: location.city,
            country: location.country_name,
          });
        }
      });
  });

  const [browserLocation] = useLocation();
  const locationRef = useRef<string>();
  useEffect(() => {
    if (locationRef.current !== browserLocation) {
      locationRef.current = browserLocation;
      recordEvent("load", {
        ua: window.navigator.userAgent,
        referrer: document.referrer,
      });
    }
  }, [browserLocation]);

  return null;
};
