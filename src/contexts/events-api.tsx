import React, { useCallback, useEffect, useRef } from "react";
import { apiToken } from "../data/token";
import { bearerPrefix } from "../utils/bearer-prefix";
import { randomId } from "../utils/random-id";

type EventApiContextCallbacks = {
  recordEvent: (type: string, data: Object) => void;
};

type EventApiContextValue = EventApiContextCallbacks;

type TokenResponse = {
  app_name: string;
  access_token: string;
  dtable_uuid: string;
  dtable_server: string;
  dtable_socket: string;
  dtable_db: string;
  workspace_id: number;
  dtable_name: string;
};

const suppressEvents = () =>
  import.meta.env.MODE === "development" ||
  document.cookie.match(/^(.*;)?\s*itsme\s*=\s*[^;]+(.*)?$/);

export const EventApiContext = React.createContext<EventApiContextValue>({
  recordEvent: () => {},
});

const getTokenOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: bearerPrefix(apiToken()),
  },
};
export const EventApiContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const visitorId = useRef(randomId());
  const tokenRef = useRef<TokenResponse>();
  const updateAccessToken = useCallback(async () => {
    return fetch(
      "https://cloud.seatable.io/api/v2.1/dtable/app-access-token/",
      getTokenOptions
    )
      .then((res) => res.json())
      .then((res) => (tokenRef.current = res));
  }, []);

  useEffect(() => {
    updateAccessToken().catch((err) => console.error(err));
  }, [updateAccessToken]);

  const recordEvent = useCallback(
    async (type: string, data: Object) => {
      tokenRef.current = tokenRef.current ?? (await updateAccessToken());

      if (!tokenRef.current || suppressEvents()) {
        return;
      }

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: bearerPrefix(tokenRef.current.access_token),
        },
        body: JSON.stringify({
          rows: [
            {
              Timestamp: new Date().toUTCString(),
              type,
              visitor_id: visitorId.current,
              path: window.location.href,
              data: "```javascript\n" + JSON.stringify(data) + "\n```",
            },
          ],
          table_name: "sk.synth.kitchen-events",
        }),
      };

      fetch(
        `https://cloud.seatable.io/api-gateway/api/v2/dtables/${tokenRef.current.dtable_uuid}/rows/`,
        options
      ).catch((err) => console.error(err));
    },
    [updateAccessToken, tokenRef]
  );

  return (
    <EventApiContext.Provider
      value={{
        recordEvent,
      }}
    >
      {children}
    </EventApiContext.Provider>
  );
};
