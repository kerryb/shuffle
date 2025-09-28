import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(`file://${process.cwd()}/app/index.html`);
  await expect(page).toHaveTitle("Shuffle");
});
