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
  for (const key of "a B-c?.".split("")) {
    await fodder.press(key)
  }
  await expect(fodder).toHaveValue("ABC")
})

test("only accepts the number of letters from the enumeration in fodder", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  const fodder = page.getByLabel("Fodder")
  for (const key of "otterpanicfoo".split("")) {
    await fodder.press(key)
  }
  await expect(fodder).toHaveValue("OTTERPANIC")
})

test("creates solution inputs after inputting enumeration", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  const input = page.locator("#solution input")
  await expect(input).toHaveCount(10)

  const hyphen = page.locator("#solution *:nth-child(4)")
  await expect(hyphen).toHaveText("-")

  const space = page.locator("#solution *:nth-child(8)")
  await expect(space).toHaveText(" ")
})

test("shuffles letters when form is submitted", async ({ page }) => {
  const fodder = page.getByLabel("Fodder")
  await fodder.fill("OTTERPANIC")

  const shuffle = page.locator("input[type='submit']")
  await shuffle.click()

  const letterO = page.locator("#shuffled .letter >> text='O'")
  await expect(letterO).toHaveCount(1)
  const letterT = page.locator("#shuffled .letter >> text='T'")
  await expect(letterT).toHaveCount(2)
  const letterC = page.locator("#shuffled .letter >> text='C'")
  await expect(letterC).toHaveCount(1)
})

test("only allows available letters to be entered in the solution", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  const fodder = page.getByLabel("Fodder")
  await fodder.fill("OTTERPANIC")

  const shuffle = page.locator("input[type='submit']")
  await shuffle.click()

  const letter_1 = page.locator("#solution *:nth-child(1)")
  await letter_1.press("X")
  await expect(letter_1).toHaveValue("")
})
