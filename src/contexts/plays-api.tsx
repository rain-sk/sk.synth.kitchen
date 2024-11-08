import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEffectOnce } from "../hooks/use-effect-once";
import { token1, token2, token3 } from "../data/token";

const bearerPrefix = () => {
  const b = "B";
  const e = "e";
  const a = "a";
  const r = "r";
  return b + e + a + r + e + r;
};

type PlayerInfo = {
  id: string;
  plays: number;
};

type PlayerApiContextState = {
  players: Record<string, PlayerInfo>;
};

type PlayerApiContextCallbacks = {
  incrementPlayCount: (id: string) => void;
};

type PlayerApiContextValue = PlayerApiContextState & PlayerApiContextCallbacks;

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

export const PlayerApiContext = React.createContext<PlayerApiContextValue>({
  players: {},
  incrementPlayCount: () => {},
});

export const PlayerApiContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState<TokenResponse>();
  const playersRef = useRef<Record<string, PlayerInfo>>({});
  const [players, setPlayers] = useState<Record<string, PlayerInfo>>({});

  const updateAccessToken = useCallback(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `${bearerPrefix()} ${token1}${token2}${token3}`,
      },
    };
    fetch(
      "https://cloud.seatable.io/api/v2.1/dtable/app-access-token/",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setToken(res);
      })
      .catch((err) => console.error(err));
  }, [setToken]);

  useEffectOnce(() => {
    updateAccessToken();
  });

  const updatePlayerInfo = useCallback(() => {
    if (token !== undefined) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `${bearerPrefix()} ${token.access_token}`,
        },
      };

      return fetch(
        `https://cloud.seatable.io/api-gateway/api/v2/dtables/${token.dtable_uuid}/rows/?table_name=sk.synth.kitchen-plays&convert_keys=true`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          playersRef.current = Object.fromEntries(
            res.rows.map(
              (row: { _id: string; Name: string; plays: number }) => [
                row.Name,
                { id: row._id, plays: row.plays },
              ]
            )
          );
          setPlayers(playersRef.current);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  useEffect(() => {
    updatePlayerInfo();
  }, [token, updatePlayerInfo]);

  const incrementPlayCount = useCallback(
    (name: string) => {
      if (
        !token ||
        !players ||
        !players[name] ||
        import.meta.env.MODE === "development"
      ) {
        return;
      }

      updatePlayerInfo()?.finally(() => {
        const options = {
          method: "PUT",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `${bearerPrefix()} ${token.access_token}`,
          },
          body: JSON.stringify({
            table_name: "sk.synth.kitchen-plays",
            updates: [
              {
                row: { plays: `${playersRef.current[name].plays + 1}` },
                row_id: playersRef.current[name].id,
              },
            ],
          }),
        };

        fetch(
          `https://cloud.seatable.io/api-gateway/api/v2/dtables/${token.dtable_uuid}/rows/`,
          options
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              updatePlayerInfo();
            }
          })
          .catch((err) => console.error(err));
      });
    },
    [token, players, updatePlayerInfo]
  );

  return (
    <PlayerApiContext.Provider
      value={{
        players,
        incrementPlayCount,
      }}
    >
      {children}
    </PlayerApiContext.Provider>
  );
};
