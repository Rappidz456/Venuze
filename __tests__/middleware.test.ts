import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import { AUTH_COOKIE, ROUTES } from "@/lib/constants";

function request(path: string, cookie?: string) {
  const headers = new Headers();
  if (cookie) headers.set("cookie", `${AUTH_COOKIE}=${cookie}`);
  return new NextRequest(new URL(path, "http://localhost:3000"), { headers });
}

describe("middleware", () => {
  it("sends guests from home to login", () => {
    const response = middleware(request(ROUTES.home));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login");
  });

  it("preserves the venues path and query on the return URL", () => {
    const response = middleware(request("/venues?city=Dubai"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?from=%2Fvenues%3Fcity%3DDubai",
    );
  });

  it("leaves login public for guests", () => {
    const response = middleware(request(ROUTES.login));
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("bounces a signed-in visit away from login", () => {
    const response = middleware(request(ROUTES.login, "session-token"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("lets a signed-in user through to home and venues", () => {
    expect(middleware(request(ROUTES.home, "session-token")).status).toBe(200);
    expect(middleware(request(ROUTES.venues, "session-token")).status).toBe(200);
  });
});
