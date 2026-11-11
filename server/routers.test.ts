import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie() {} } as unknown as TrpcContext["res"],
  };
}

describe("appRouter", () => {
  it("returns the current user from auth.me", async () => {
    const user = {
      id: 7,
      openId: "router-test-user",
      email: "router@example.com",
      name: "Router Test",
      loginMethod: "test",
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };

    await expect(appRouter.createCaller(createContext(user)).auth.me()).resolves.toEqual(user);
  });

  it("returns a healthy response from system.health", async () => {
    await expect(appRouter.createCaller(createContext()).system.health({ timestamp: 123 })).resolves.toEqual({ ok: true });
  });

  it("protects owner notifications from unauthenticated callers", async () => {
    await expect(
      appRouter.createCaller(createContext()).system.notifyOwner({ title: "Test", content: "Test" }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
