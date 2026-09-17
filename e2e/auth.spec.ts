import { expect, test } from "@playwright/test";
import { signIn } from "./helpers";

test.describe("auth gates", () => {
  test("sends a guest from home to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  });

  test("sends a guest from services back to login with a return path", async ({ page }) => {
    await page.goto("/venues?city=Dubai");
    await expect(page).toHaveURL(/\/login\?from=/);
    await expect(page.url()).toContain(encodeURIComponent("/venues?city=Dubai"));
  });

  test("keeps the login page public", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });
});

test.describe("signed-in session", () => {
  test("demo login lands on home, then opens services with the ReqRes name", async ({ page }) => {
    await signIn(page);
    await expect(page).toHaveURL("/");

    await page.goto("/venues");
    await expect(page).toHaveURL(/\/venues/);
    await expect(page.getByText("Eve Holt")).toBeVisible();
    await expect(page.getByRole("button", { name: "Where" })).toBeVisible();
  });

  test("a signed-in visit to login bounces home", async ({ page }) => {
    await signIn(page);
    await page.goto("/login");
    await expect(page).not.toHaveURL(/\/login/);
  });
});
