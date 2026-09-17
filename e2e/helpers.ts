import type { Page } from "@playwright/test";
import { DEMO_LOGIN } from "../lib/constants";

export async function signIn(page: Page) {
  await page.goto("/login");
  const email = page.getByLabel("Email");
  await email.click({ clickCount: 3 });
  await email.fill(DEMO_LOGIN.email);
  await page.getByLabel("Password").fill(DEMO_LOGIN.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL((url) => url.pathname !== "/login");
}
