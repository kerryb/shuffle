import { test as base, expect } from '@playwright/test'

const test = base.extend({
  pageWithEnumeration: async ({ page }, use) => {
    const enumeration = page.getByLabel("Enumeration")
    await enumeration.fill("3-3,4")
    await enumeration.blur()
    await use(page)
  },
  pageWithFodder: async ({ pageWithEnumeration }, use) => {
    await pageWithEnumeration.getByLabel("Fodder").fill("OTTERPANIC")
    await pageWithEnumeration.locator("input[type='submit']").click()
    await use(pageWithEnumeration)
  },
})

test.beforeEach(async ({ page }) => {
  await page.goto("/")
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

test("only accepts the number of letters from the enumeration in fodder", async ({ pageWithEnumeration }) => {
  const page = pageWithEnumeration
  const fodder = page.getByLabel("Fodder")
  for (const key of "otterpanicfoo".split("")) {
    await fodder.press(key)
  }
  await expect(fodder).toHaveValue("OTTERPANIC")
})

test("creates solution inputs after inputting enumeration", async ({ pageWithEnumeration }) => {
  const page = pageWithEnumeration
  await expect(page.locator("#solution input")).toHaveCount(10)
  await expect(page.locator("#solution *:nth-child(4)")).toHaveText("-")
  await expect(page.locator("#solution *:nth-child(8)")).toHaveText(" ")
})

test("shuffles letters when form is submitted", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  expect((await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")).not.toEqual("OTTERPANIC")

  await expect(page.locator("#shuffled .letter >> text='O'")).toHaveCount(1)
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(2)
  await expect(page.locator("#shuffled .letter >> text='C'")).toHaveCount(1)
})

test("allows fodder to be submitted with enter key", async ({ pageWithEnumeration }) => {
  const page = pageWithEnumeration
  const fodder = page.getByLabel("Fodder")
  await fodder.fill("OTTERPANIC")
  await fodder.press("Enter")
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(2)
})

test("reshuffles letters when form is resubmitted", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const firstShuffle = (await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")

  await page.locator("input[type='submit']").click()
  expect((await page.locator("#shuffled span.letter").evaluateAll(list => list.map(element => element.textContent)))
    .join("")).not.toEqual(firstShuffle)
  await expect(page.locator("#shuffled .letter >> text='O'")).toHaveCount(1)
})

test("leaves out letters already in solution when reshuffling", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("input[type='submit']").click()
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("O")
  await page.locator("input[type='submit']").click()
  await expect(page.locator("#shuffled .letter >> text='O'")).toHaveCount(0)
})

test("only allows available letters to be entered in the solution", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("X")
  await expect(letter_1).toHaveValue("")
})

test("removes shuffled letters when they’re entered in the solution", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("T")
  await expect(letter_1).toHaveValue("T")
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(1)
})

test("converts solution letters to upper case", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("t")
  await expect(letter_1).toHaveValue("T")
})

test("allows solution letters to be overtyped", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("T")
  await letter_1.press("E")
  await expect(letter_1).toHaveValue("E")
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(2)
  await expect(page.locator("#shuffled .letter >> text='E'")).toHaveCount(0)
})

test("shifts focus to the next solution letter after entering a valid letter", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("#solution input:nth-of-type(1)").press("T")
  await expect(page.locator("#solution input:nth-of-type(2)")).toBeFocused()
})

test("does not shift focus after entering an invalid letter", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("#solution input:nth-of-type(1)").press("4")
  await expect(page.locator("#solution input:nth-of-type(1)")).toBeFocused()
})

test("skips past hyphens when shifting focus", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("#solution input:nth-of-type(3)").press("N")
  await expect(page.locator("#solution input:nth-of-type(4)")).toBeFocused()
})

test("skips past spaces when shifting focus", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("#solution input:nth-of-type(6)").press("T")
  await expect(page.locator("#solution input:nth-of-type(7)")).toBeFocused()
})

test("does not shift focus when deleting a letter", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  await page.locator("#solution input:nth-of-type(1)").press("T")
  const letter_2 = page.locator("#solution input:nth-of-type(2)")
  await letter_2.press("I")
  await letter_2.focus()
  await letter_2.press("Backspace")
  await expect(letter_2).toBeFocused()
})

test("shifts focus back a letter when hitting backspace in an empty input", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_2 = page.locator("#solution input:nth-of-type(2)")
  await letter_2.focus()
  await letter_2.press("Backspace")
  await expect(page.locator("#solution input:nth-of-type(1)")).toBeFocused()
})

test("returns a letter to the shuffle when deleted from the solution", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("T")
  await letter_1.focus()
  await letter_1.press("Backspace")
  await expect(letter_1).toHaveValue("")
  await expect(page.locator("#shuffled .letter >> text='T'")).toHaveCount(2)
})

test("clears fodder and solution when enumeration is changed", async ({ pageWithFodder }) => {
  const page = pageWithFodder
  const letter_1 = page.locator("#solution input:nth-of-type(1)")
  await letter_1.press("T")
  const enumeration = page.getByLabel("Enumeration")
  await enumeration.fill("10")
  await enumeration.blur()
  await expect(page.getByLabel("Fodder")).toHaveValue("")
  await expect(page.locator("#shuffled .letter")).toHaveCount(0)
  await expect(letter_1).toHaveValue("")
})
