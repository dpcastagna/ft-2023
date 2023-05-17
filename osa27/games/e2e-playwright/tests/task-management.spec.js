const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Task application!");
  await expect(page.locator("h1")).toHaveText("Tasks");
  await expect(page.locator("h2")).toHaveText(["Add a task", "Active tasks"]);
});

test("Can create a task.", async ({ page }) => {
    await page.goto("/");
    const taskName = `My task: ${Math.random()}`;
    await page.locator("input[type=text]").type(taskName);
    await page.locator("input[type=submit]").click();
    await expect(page.locator(`a >> text='${taskName}'`)).toHaveText(taskName);
  });

  test("Can open a task page.", async ({ page }) => {
    await page.goto("/");
    const taskName = `My task: ${Math.random()}`;
    await page.locator("input[type=text]").type(taskName);
    await page.locator("input[type=submit]").click();
    await page.locator(`a >> text='${taskName}'`).click();
    await expect(page.locator("h1")).toHaveText(taskName);
  });