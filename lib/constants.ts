export const APP_NAME = "Venuze";

export const AUTH_COOKIE = "venuze_session";

export const ROUTES = {
  home: "/",
  venues: "/venues",
  login: "/login",
} as const;

export const DEMO_LOGIN = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
} as const;

export const PRICE_BOUNDS = {
  min: 10,
  max: 30000,
} as const;

export const PRICE_CURRENCY = "AED";
