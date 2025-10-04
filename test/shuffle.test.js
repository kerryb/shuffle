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

  await expect(page.locator("#solution input")).toHaveCount(10)
  await expect(page.locator("#solution *:nth-child(4)")).toHaveText("-")
  await expect(page.locator("#solution *:nth-child(8)")).toHaveText(" ")
})

test("shuffles letters when form is submitted", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  await page.getByLabel("Fodder").fill("OTTERPANIC")
  await page.locator("input[type='submit']").click()
  expect((await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")).not.toEqual("OTTERPANIC")

  await expect(page.locator("#shuffled .letter >> text='O'")).toHaveCount(1)
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(2)
  await expect(page.locator("#shuffled .letter >> text='C'")).toHaveCount(1)
})

test("reshuffles letters when form is resubmitted", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  await page.getByLabel("Fodder").fill("OTTERPANIC")
  const shuffle = page.locator("input[type='submit']")
  await shuffle.click()
  const firstShuffle = (await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")

  await shuffle.click()
  expect((await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")).not.toEqual(firstShuffle)
  await expect(page.locator("#shuffled .letter >> text='O'")).toHaveCount(1)
})

test("only allows available letters to be entered in the solution", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  await page.getByLabel("Fodder").fill("OTTERPANIC")
  await page.locator("input[type='submit']").click()

  const letter_1 = page.locator("#solution *:nth-child(1)")
  await letter_1.press("X")
  await expect(letter_1).toHaveValue("")
})

test("removes shuffled letters when they’re entered in the solution", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  await page.getByLabel("Fodder").fill("OTTERPANIC")
  await page.locator("input[type='submit']").click()

  const letter_1 = page.locator("#solution *:nth-child(1)")
  await letter_1.press("T")
  await expect(letter_1).toHaveValue("T")
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(1)
})

test("converts solution letters to upper case", async ({ page }) => {
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("3-3,4")
  await enumeration.blur()
  await page.getByLabel("Fodder").fill("OTTERPANIC")
  await page.locator("input[type='submit']").click()

  const letter_1 = page.locator("#solution *:nth-child(1)")
  await letter_1.press("t")
  await expect(letter_1).toHaveValue("T")
})
