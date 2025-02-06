import { expect, test } from "@playwright/test";

test("home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Spot the Difference");
});

test("play", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start!" }).click();

  const messedWith = page.locator('[data-testid="messed-with-snippet"]');
  await expect(messedWith).toBeVisible();
  const messedWithText = await messedWith.textContent();
  if (!messedWithText) throw new Error("No messed with text found");
  const original = page.locator('[data-testid="original-snippet"]');
  await expect(original).toBeVisible();
  const originalText = await original.textContent();
  if (!originalText) throw new Error("No original text found");
  // console.log(originalText);
  // console.log(messedWithText);

  let correctSpot = -1;
  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    const messedWithChar = messedWithText[i];
    if (char !== messedWithChar) {
      // console.log("THE DIFFERENCE IS AT", i, messedWithText[i]);
      correctSpot = i;
      break;
    }
  }

  await page.waitForTimeout(100);
  await page.getByRole("button", { name: "Pause" }).click();
  await page.waitForTimeout(100);
  await page.getByRole("button", { name: "Unpause" }).click();
  await page.waitForTimeout(100);
  await page.getByRole("button", { name: "Hint" }).click();
  await page.waitForTimeout(100);
  await page.getByRole("button", { name: "Hint" }).click();

  // Wrong
  const wrongSpan = page
    .getByTestId("messed-with-snippet")
    .locator(`span:nth-child(${correctSpot === 0 ? 2 : 1})`);
  await wrongSpan.click();
  await expect(page.getByText("Guesses: 1")).toBeVisible();

  // Right
  const rightSpan = page
    .getByTestId("messed-with-snippet")
    .locator(`span:nth-child(${correctSpot + 1})`);
  await rightSpan.click();
  await expect(
    page.getByRole("heading", { name: "You did it!" })
  ).toBeVisible();

  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Next!" }).click();
});
