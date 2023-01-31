const { test, expect } = require("@playwright/test");

test("Main page does not show statistics when there are no lists in database", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h3")).toHaveText("No shopping lists yet", {
    timeout: 10000,
  });
});

test("Main page shows a link to the lists tab", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[href='/lists']")).toHaveCount(1);
});

test("Lists page shows the form", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("form[action='/lists']")).toHaveCount(1);
});

test("Lists page form works correctly", async ({ page }) => {
  await page.goto("/lists");
  await expect(await page.locator("li >> .lists-element").count()).toEqual(0);
  await page.locator("input[id='name']").type("Test list");
  await page.locator("input[id='submit-button']").click();
  await expect(page.locator("li.lists-element")).toHaveCount(1);
  await expect(page.locator("li.lists-element >> a").first()).toHaveText(
    "Test list",
  );
});

test("lists have deactivate button", async ({ page }) => {
  await page.goto("/lists");
  await expect(
    page.locator("li.lists-element >> input[id='deactivate-button']").first(),
  ).toHaveCount(1);
});

test("list can be deactivated", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("li.lists-element >> input[id='deactivate-button']")
    .first().click();
  await expect(await page.locator("li >> .lists-element").count()).toEqual(0);
});

test("lists element redirect to list page", async ({ page }) => {
  await page.goto("/lists");
  await expect(await page.locator("li >> .lists-element").count()).toEqual(0);
  await page.locator("input[id='name']").type("Test list 2");
  await page.locator("input[id='submit-button']").click();
  await page.locator("li.lists-element >> a").first().click();
  await expect(page.locator("h2").first()).toHaveText("Test list 2");
});

test("can add items to list page", async ({ page }) => {
  await page.goto("/lists/2");
  await expect(await page.locator("li >> .item-element").count()).toEqual(0);
  await page.locator("input[id='name']").type("Test item");
  await page.locator("input[id='submit-button']").click();
  await expect(page.locator("li.item-element")).toHaveCount(1);
  await expect(page.locator("li.item-element >> h4").first()).toHaveText(
    "Test item",
  );
});
