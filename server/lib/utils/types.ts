import type { Admin, Student, User as BaseUser } from "@server/lib/generated/prisma";
import type { Env } from "hono";

export interface UserInfo {
  user: BaseUser;
  admin: Admin | null;
  student: Student | null;
}

export interface AdminUser
  extends Omit<BaseUser, "passwordHash">,
    Omit<Admin, "id"> {
  role: "admin";
}
export interface StudentUser
  extends Omit<BaseUser, "passwordHash">,
    Omit<Student, "id"> {
  role: "student";
}

export type User = AdminUser | StudentUser;

export interface BaseEnv extends Env {
  Variables: {
    user: User | null;
  };
}

export interface StudentEnv extends BaseEnv {
  Variables: {
    user: StudentUser;
  };
}

export interface AdminEnv extends BaseEnv {
  Variables: {
    user: AdminUser;
  };
}
