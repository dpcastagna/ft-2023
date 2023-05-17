const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  await expect(page.locator("h2")).toHaveText(["Lists", "Statistics"]);
});

test("Page listing shopping lists has expected title and headings.", async ({ page }) => {
  await page.goto("/lists");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Lists");
  await expect(page.locator("h2")).toHaveText("Active lists");
  await expect(page.locator("h3")).toHaveText("Add a list");
});

test("Creating a new shopping list works.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Lidl");
  await page.locator(`input[type=submit] >> text='Create list!'`).click();
  await expect(page.locator(`ul > li >> text='Lidl'`).first()).toContainText("Lidl");
});

test("Adding items to a shopping list works.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`ul > li > a >> text='Lidl'`).first().click();
  await expect(page.locator("h1")).toHaveText("Lidl");
  await expect(page.locator("h4")).toHaveText("Add an item");
  await page.locator("input[type=text]").type("maito");
  await page.locator(`input[type=submit] >> text='Add item!'`).click();
  await expect(page.locator(`ul > li >> text='maito'`).first()).toContainText("maito");
  await expect(page.locator(`ul > li >> text='maito'`).first()).not.toContainText("maitoo");
});

test("Collecting an item to a shopping list works.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`ul > li > a >> text='Lidl'`).first().click();
  await expect(page.locator("h1")).toHaveText("Lidl");
  await expect(page.locator("h4")).toHaveText("Add an item");
  await page.locator(`input[type=submit] >> text='Mark collected!'`).click();
  await expect(page.locator(`del >> text='maito'`).first()).toContainText("maito");
  await expect(page.locator(`del >> text='maito'`).first()).not.toContainText("maitoo");
});

test("Deactivating a shopping list works.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Smarket");
  await page.locator(`input[type=submit] >> text='Create list!'`).click();
  await expect(page.locator(`ul > li >> text='Smarket'`).first()).toContainText("Smarket");
  await page.locator(`input[type=submit] >> text='Deactivate list!'`).nth(1).click();
  await expect(page.locator("ul").first()).not.toContainText("Smarket");
});

test("Statistics work.", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("li").first()).toContainText("Shopping lists: ");
  await expect(page.locator("li").nth(1)).toContainText("Shopping list items: ");
});