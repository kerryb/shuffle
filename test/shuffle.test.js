import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto(`file://${process.cwd()}/app/index.html`)
})

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Shuffle")
})

test("only accepts digits, commas and hyphens in enumeration", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  for (const key of ["4", "x", "-", "2", ",", " ", "5"]) {
    await enumeration.press(key)
  }
  await expect(enumeration).toHaveValue("4-2,5")
})

test("only accepts letters in fodder, and converts them to upper case", async ({ page }) => {
  const fodder = page.getByLabel("Fodder")
  for (const key of ["a", "B", " ", "1", "_", "c"]) {
    await fodder.press(key)
  }
  await expect(fodder).toHaveValue("ABC")
})
