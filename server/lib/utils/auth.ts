import { sign, verify } from "hono/jwt";
import type { User, UserInfo } from "./types";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";

const EXPIRATION_TIME = 60 * 60 * 24 * 7;

export function makeSiteUser(userInfo: UserInfo): User {
  const { user, admin, student } = userInfo;

  if (admin) {
    return {
      ...user,
      ...admin,
      role: "admin",
      // @ts-ignore
      passwordHash: undefined,
    };
  }

  if (student) {
    return {
      ...user,
      ...student,
      role: "student",
      // @ts-ignore
      passwordHash: undefined,
    };
  }

  throw new Error("User must be either admin or student");
}

export async function createJWT(user: User) {
  return await sign(
    {
      user,
      exp: Math.floor(Date.now() / 1000) + EXPIRATION_TIME,
    },
    process.env.JWT_SECRET!
  );
}

export async function verifyJWT(token: string) {
  const { user } = await verify(token, process.env.JWT_SECRET!);
  return user as User;
}
