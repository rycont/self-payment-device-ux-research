import { API_URI } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { isDev } from "@/function";

export interface APIConnectorArgs<MockDataType> {
  route: string;
  needAuth: boolean;
  method: "GET" | "POST";
  mockData: MockDataType;
}

interface Config {
  wait?: boolean;
}

export const fillURLParameter = (
  route: string,
  param: Record<string, string | number> = {},
) => {
  if (!route.includes(":")) return route;

  const filled = Object.entries(param).reduce(
    (replaced, [key, value]) => replaced.replace(":" + key, value.toString()),
    route,
  );

  if (filled.includes(":")) {
    throw new Error(
      "Not enough parameter, not found: " + filled.split(":").slice(1).join(""),
    );
  }

  return filled;
};

export const createAPIConnector = <ReqType, ResType>({
  route,
  needAuth,
  method,
  mockData
}: APIConnectorArgs<ResType>) => {
  if (route[0] === "/") {
    throw new Error("API Connector Route cannot starts with /");
  }
  function useHook(body: ReqType, config: Config = {}) {
    const [data, setData] = useState<ResType>();
    const [error, setError] = useState<string>();

    useEffect(() => {
      if (config.wait === true) return;
      (async () => {
        if (isDev && mockData) {
          setTimeout(() => setData(() => mockData), 1000)
          return
        }

        const requestEndpoint = API_URI +
          (method === "GET"
            ? fillURLParameter(
              route,
              body as unknown as Record<string, string | number>,
            )
            : route);
        try {
          const fetched = await fetch(requestEndpoint, {
            method,
            body: (method === "POST" && body)
              ? JSON.stringify(body)
              : undefined,
          });
          const _data = await fetched.json();
          if (!fetched.ok) throw _data;
          setData(_data);
        } catch (e) {
          setError("데이터를 불러오는데 문제가 발생했어요");
        }
      })();
    }, [body]);

    return {
      data,
      error,
    };
  }

  async function request(body: ReqType): Promise<ResType> {
    const requestEndpoint = API_URI +
      (method === "GET"
        ? fillURLParameter(
          route,
          body as unknown as Record<string, string | number>,
        )
        : route);
    const data = await (await fetch(requestEndpoint, {
      method,
      body: JSON.stringify(body),
    })).json();
    return await data;
  }

  return {
    useHook,
    request,
  };
};