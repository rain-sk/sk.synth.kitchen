import React, { useCallback, useEffect, useRef, useState } from "react";
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

export const EventApiContext = React.createContext<EventApiContextValue>({
  recordEvent: () => {},
});

export const EventApiContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const visitorId = useRef(randomId());
  const [token, setToken] = useState<TokenResponse>();

  const updateAccessToken = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: bearerPrefix(apiToken()),
      },
    };

    return fetch(
      "https://cloud.seatable.io/api/v2.1/dtable/app-access-token/",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setToken(res);
        return res;
      });
  }, [setToken]);

  useEffect(() => {
    updateAccessToken().catch((err) => console.error(err));
  }, [updateAccessToken]);

  const recordEvent = useCallback(
    async (type: string, data: Object) => {
      let t = token ? token : await updateAccessToken();
      if (!t || import.meta.env.MODE === "development") {
        return;
      }
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: bearerPrefix(t.access_token),
        },
        body: JSON.stringify({
          rows: [
            {
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
        `https://cloud.seatable.io/api-gateway/api/v2/dtables/${t.dtable_uuid}/rows/`,
        options
      ).catch((err) => console.error(err));
    },
    [updateAccessToken, token]
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
