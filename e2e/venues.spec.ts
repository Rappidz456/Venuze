import { expect, test } from "@playwright/test";
import { signIn } from "./helpers";

test("searching from the compact bar reaches the venues list", async ({ page }) => {
  await signIn(page);
  await page.goto("/venues");
  await page.getByRole("button", { name: "Where" }).click();
  await page.getByRole("button", { name: "Dubai, UAE" }).click();
  await page.getByRole("button", { name: "Search venues" }).click();

  await expect(page).toHaveURL(/city=Dubai/);
});
