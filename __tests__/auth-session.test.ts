import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearReqResUsersCache,
  displayNameFromEmail,
  encodeSession,
  fetchReqResProfile,
  parseSession,
  toAuthUser,
} from "@/lib/auth-session";

const USERS_PAGE_1 = {
  data: [
    {
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
  ],
};

const USERS_PAGE_2 = {
  data: [
    {
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
  ],
};

describe("displayNameFromEmail", () => {
  it("turns the email local-part into a display name", () => {
    expect(displayNameFromEmail("eve.holt@reqres.in")).toBe("Eve Holt");
    expect(displayNameFromEmail("john_snow@example.com")).toBe("John Snow");
  });
});

describe("session encode/parse", () => {
  it("round-trips a session payload", () => {
    const raw = encodeSession({
      token: "QpwL5tke4Pnpja7X4",
      email: "eve.holt@reqres.in",
      name: "Eve Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    });
    expect(parseSession(raw)).toEqual({
      token: "QpwL5tke4Pnpja7X4",
      email: "eve.holt@reqres.in",
      name: "Eve Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    });
  });

  it("returns null for missing or corrupt cookies", () => {
    expect(parseSession(undefined)).toBeNull();
    expect(parseSession("not-base64")).toBeNull();
  });

  it("fills the name from the email when the cookie omitted it", () => {
    const raw = Buffer.from(
      JSON.stringify({ token: "abc", email: "eve.holt@reqres.in" }),
    ).toString("base64");
    expect(parseSession(raw)?.name).toBe("Eve Holt");
  });
});

describe("toAuthUser", () => {
  it("exposes the fields the header needs", () => {
    expect(
      toAuthUser({
        token: "abc",
        email: "eve.holt@reqres.in",
        name: "Eve Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
      }),
    ).toEqual({
      email: "eve.holt@reqres.in",
      name: "Eve Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    });
  });
});

describe("fetchReqResProfile", () => {
  beforeEach(() => {
    clearReqResUsersCache();
    vi.restoreAllMocks();
  });

  it("uses the matching user's name, not a random one", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      const body = url.includes("page=2") ? USERS_PAGE_2 : USERS_PAGE_1;
      return new Response(JSON.stringify(body), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(Math, "random").mockReturnValue(0);

    const profile = await fetchReqResProfile("eve.holt@reqres.in");

    expect(profile.name).toBe("Eve Holt");
    expect(profile.name).not.toBe("George Bluth");
    expect(profile.avatar).toBe("https://reqres.in/img/faces/1-image.jpg");
  });

  it("falls back to the email when ReqRes has no matching user", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ data: [] }), { status: 200 })),
    );

    const profile = await fetchReqResProfile("planner@venuze.test");
    expect(profile.name).toBe("Planner");
  });

  it("reuses the in-memory user cache on the next call", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(USERS_PAGE_1), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await fetchReqResProfile("eve.holt@reqres.in");
    await fetchReqResProfile("eve.holt@reqres.in");

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
