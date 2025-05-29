import { createFactory } from "hono/factory";
import type { BaseEnv, StudentEnv, AdminEnv } from "./types";

export const baseFactory = createFactory<BaseEnv>();

export const studentFactory = createFactory<StudentEnv>();

export const adminFactory = createFactory<AdminEnv>();
