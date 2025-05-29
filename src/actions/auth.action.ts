import type { InferRequestType, InferResponseType } from "hono/client";
import client from "../client";

const { login, me } = client.api.auth;

type MeResponse = InferResponseType<typeof me.$get>;

export async function getMeAction(token: string): Promise<MeResponse> {
  const response = await me.$get(
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}

export async function loginAction(
  id: string,
  password: string
): Promise<{ success: boolean; token?: string }> {
  const response = await login.$post({
    json: {
      id: id,
      password: password,
    },
  });

  if (!response.ok) {
    return { success: false };
  }

  const data = await response.json();
  return { success: true, token: data.token };
}
